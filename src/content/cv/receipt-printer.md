---
name: Receipt Printer
category: project
summary: A publicly accessible thermal receipt printer — anyone in the world can send a printed message directly to my desk in real time.
hardware:
  - Raspberry Pi
  - Epson thermal printer (M244A/TM-T88V series)
tech_stack:
  - Node.js
  - Cloudflare Tunnel
links: [https://printer.eastonco.net]
date_range: '2026'
---

# Receipt Printer

## Overview

I picked up an Epson thermal receipt printer (M244A/TM-T88V series) off Facebook Marketplace and hooked it up to a Raspberry Pi. The Pi runs a small Node.js service that exposes a simple web interface and API for sending print jobs, and the whole thing is tunneled to the public internet via a Cloudflare Tunnel at printer.eastonco.net. It lets anyone in the world print a receipt directly to my desk, on demand.

## Build & Stack

- **Hardware:** Epson thermal printer (M244A/TM-T88V series), connected via USB to a Raspberry Pi
- **Backend:** Node.js (v22.20.0+) HTTP service, with a `POST /print` endpoint accepting JSON payloads and a `GET /health` check
- **Frontend:** Lightweight web interface for sending messages without hitting the API directly
- **Networking:** Cloudflare Tunnel, publishing the service to printer.eastonco.net
- **Printing features:** automatic receipt formatting with header/footer, date/time stamps, paper cutting support, and error handling/logging
- **Testing:** includes a stress-test script to validate the service under load
- Built with Claude Code

## Why I Build Things Like This

I really enjoy silly, low-stakes projects like this one. I think they're one of the best uses of imagination, creativity, and — especially now — AI: it's never been easier to take a fun, ridiculous idea and turn it into a working proof of concept. Projects like the receipt printer are a big part of why I enjoy engineering in the first place.