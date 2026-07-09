---
name: Free Stuff Finder
category: project
summary: A Craigslist scraper with AI-powered classification that alerts you to free listings matching your personal preferences in real time — faster than Craigslist's own notifications.
collaborators:
  - Silas Stokes
hardware:
  - Raspberry Pi
tech_stack:
  - Python
  - Next.js
  - TypeScript
  - Postgres
  - Selenium
  - Docker
  - Cloudflare Tunnel
  - Claude Haiku (Anthropic API)
  - ntfy
links: [https://github.com/Eastonco/free-stuff-finder]
date_range: '2026'
---

# Free Stuff Finder

## Overview

Free Stuff Finder is a Craigslist scraper I built with a friend to catch free listings before Craigslist's own notification system gets around to it — which, in practice, is far too slow to be useful. The original version was a handwritten Python CLI tool; we later revised it into a full system with a web frontend and a Postgres backend so it could scale beyond just the two of us.

Each new "free" listing gets scraped, run through an AI classifier to judge whether it actually matches what you're looking for, and — if it's a match — pushed to you as a real-time notification.

## How It Works

- **Scraper:** A Python loop scrapes active searches from Craigslist's free section using a real (headless) browser.
- **Classification:** Every new listing is run through Claude Haiku against a plain-English description of what you're looking for (e.g. "a vintage road bike around 56cm, no kids bikes, no project bikes"), so matches are judged on intent, not just keywords. A configurable blacklist filters out common junk we never want — things like dirt or gravel — and a cheap keyword pre-filter runs first to skip obvious junk before it ever reaches the AI.
- **Notifications:** Matches are pushed out via ntfy, an open-source, free push-notification platform — with SMS, email, and Discord webhook support as alternatives.
- **Self-serve profiles:** Anyone (my friend and I, and anyone else we invite) can set up their own search profile — what to watch, what they want, how to be notified — through a self-serve web page gated by an invite code.
- **Admin dashboard:** A read-only, HTTP Basic Auth–protected dashboard shows every profile, notification settings, per-search scrape stats, scraper liveness (heartbeat), and recent AI classifications.

## Build & Stack

- **Backend/scraper:** Python (headless Firefox via Selenium)
- **Web app:** Next.js (TypeScript)
- **Database:** Postgres — config and search profiles live in the database rather than JSON files, with the web app writing profiles and the scraper loop reading them each cycle
- **AI classification:** Claude Haiku (Anthropic API)
- **Notifications:** ntfy, with SMS, email, and Discord webhook support
- **Infra:** Runs on a Raspberry Pi at home, containerized with Docker Compose (Postgres, Selenium, web app, and scraper loop as separate services), exposed to the public internet via a Cloudflare Tunnel

## Why I Build Things Like This

Like the receipt printer, this is one of those projects I built purely because it was fun. I love how AI has lowered the barrier to turning a slightly ridiculous idea — "what if I could out-race Craigslist's own notifications" — into something real, useful, and shareable with friends.