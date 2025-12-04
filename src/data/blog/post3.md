---
title: "Building stock tracker app using Next.js 15, MongoDB, and Tradingview"
description: "A deep dive into building a full-stack market dashboard with MongoDB, Finnhub, and Gemini for personalized insights."
date: "2025-12-03"
image: "/images/posts/post-3.png"
tags: ["nextjs", "mongodb", "typescript", "project"]
---

## Post (3) - Building a Stock Tracker Application

I've been wanting to dive deeper into Next.js 15's new features, experiment with server actions, and try my hand at integrating multiple APIs. This project gave me the perfect excuse to do all of that.

## The Tech Stack

## Next.js with React 19

This project was built with Next.js 15, and working with server components by default meant I could fetch data directly in my components without worrying about client-side waterfalls. The new server actions made API routes feel obsolete for most use cases.

## MongoDB + Mongoose

MongoDB has a flexible and straightforward data structure. User watchlists, stock preferences user profiles all fit naturally into document-based storage. Mongoose gave me type safety and a clean API for working with the data.

## Finnhub API

For the real-time stockdata, Finnhub was used as it offered a free tier with everything needed:

- Stock search
- Real-time qoutes
- Company profiles
- Market Watch.

## TradingView Widgets

TradingView offers embeddable widgets which handle all the charting and are very easy to use.

## Inngest for Background Jobs

I have never worked with inngest earlier and it was a fun to try out. The purpose of it in the case of this project was to send daily news summaries to users. Instead of setting up cron jobs, Inngest let me define functions that run on schedule.

## Building the features

**Debouncing is your friend.** When building the search, at first an API call would be triggered on each keystroke. This is where debouncing came in handy. a 300ms delay felt perfectly fast enough to feel instant, slow enough to avoid unecessary requests.

**Loading states matter.** Nothing kills UX like clicking something and wondering if it's working. Thats why loading spinners and skeleton states were added throughout the project.

**Popular stocks on load.** When users open the search dialog, showing popular stocks immediatly gives the something to explore before searching.

## Real-Time Data Caching

Stock prices change constantly, but I can't hit the API on every page reload. For this, Next.js built in caching with revalidation was used.

## What's Next?

The app is functional, but there's always more that could be built:

- **Price alerts**: Notify users when stocks hit certain prices
- **Portfolio tracking**: Track actual holdings, not just watchlists
- **More chart types**: Add more TradingView widgets
- **Social features**: Share watchlists with friends
- **Mobile app**: A native mobile experience would be great

But as the project was just meant for learning, I'm going to leave it as is and continue with other projects.
