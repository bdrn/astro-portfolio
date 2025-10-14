---
title: "Building a Real-Time Sales Dashboard with React 19 & Supabase"
description: "How I built a full-stack dashboard with live updates, authentication, and role-based access using React 19 and Supabase."
date: "2025-10-14"
image: "/images/posts/post-2.png"
tags: ["supabase", "react", "CRUD", "project"]
---

## Post (2) - Building a Real-Time Sales Dashboard

As a developer, I’m constantly exploring new tools to strengthen my full-stack skills. For this project, I wanted to build something featuring real-time updates, authentication, and role-based access. Supabase was a perfect choice, it combines PostgreSQL with authentication and live data subscriptions

## Project Overview

The Dashboard app is a web application that simulates tracking deals, visualizing and managing data with different permission levels. Built with React 19 and Supabase to utilize real-time subscriptions.

![Supabase Flowchart](/images/posts/supabase1.png)

### Key Features

- **Real-time sales tracking** with live updates

- **Role-based access control** (Sales Reps vs Administrators)

- **Interactive data visualization** using React Charts

- **Authentication** with Supabase Auth

### 1.3 `useActionState`

React 19 has several features that I wanted to explore, particularly `useActionState` hook for form handling.

```javascript
const [error, submitAction, isPending] = useActionState(
  async (previousState, formData) => {
    // Server action logic

    const submittedName = formData.get("name");

    const user = users.find((u) => u.name === submittedName);

    const newDeal = {
      user_id: user.id,

      value: formData.get("value"),
    };

    const { error } = await supabase.from("sales_deals").insert(newDeal);

    return error ? new Error("Failed to add deal") : null;
  },

  null
);
```

The `useActionState` hook simplifies form handling by combining state management, async operations, and error handling into a single, declarative pattern. This made form submissions much cleaner and more predictable.

### 2. Real-Time Data with Supabase Subscriptions

I needed the dashboard to update instantly when new deals where added to the db without requiring a refresh, this is where supabase provided a perfect solution.

```javascript
useEffect(() => {
  fetchMetrics();

  const channel = supabase

    .channel("deal-changes")

    .on(
      "postgres_changes",

      {
        event: "*",

        schema: "public",

        table: "sales_deals",
      },

      (payload) => {
        fetchMetrics(); // Refresh data on any change
      }
    )

    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

Real-time subscriptions are incredibly powerful for purposes like this when data is needed instantly, however it is important to note that cleanup is important to prevent memory leaks. After all Supabase is using PostgreSQL under the hood.

### 3. Role-Based Access Control (RBAC)

Different users needed different permissions

- **Sales Reps:** Can only view/add their own deals
- **Admins:** Can view/add deals for anyone

For this purpose RBAC was implemented on both the frontend and database.

**Frontend**

```javascript
const generateOptions = () => {
  return users

    .filter((user) => user.account_type === "rep" || currentUser?.account_type === "admin")

    .map((user) => (
      <option key={user.id} value={user.name}>
        {user.name}
      </option>
    ));
};
```

**Database (Row Level Security)**

```sql

-- Reps can only add their own deals
CREATE policy "Reps can only add their own deals"
ON public.sales_deals
FOR insert
TO authenticated
WITH CHECK (
auth.uid() = user_id
AND EXISTS (
SELECT 1 FROM user_profiles
WHERE user_profiles.id = auth.uid()
AND user_profiles.account_type = 'rep'
)
);

-- Admins can add anyone's deals
CREATE policy "Admins can add to anyone's deals"
ON public.sales_deals
FOR insert
TO authenticated
WITH CHECK (
EXISTS (
select 1 from user_profiles
where user_profiles.id = auth.uid()
and user_profiles.account_type = 'admin'
)
);

```

## Conclusion

Building this sales dashboard was a nice learning experience that touched on some of the challenges that I wanted to get a better understanding of, such as real-time data synchronization and role-based security. And now as I have a better understanding of Supabase, I will definitely be using it when in need of a database with authentication, real-time updates and an easy configuration.
