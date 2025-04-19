# My Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49.4-3FCF8E?style=for-the-badge&logo=supabase)](https://supabase.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://eastonco.net)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub last commit](https://img.shields.io/github/last-commit/eastonco/eastonco.github.io?style=for-the-badge)

My personal portfolio website! Took awhile but here she is. This site showcases my projects, blog posts, random games, proof of concepts, and a bit about me.

🔗 **Live Site**: [eastonco.net](https://eastonco.net)

## ✨ Features

- 🌓 Light/dark mode with theme persistence
- 📱 Fully responsive design
- 📝 MDX-powered blog functionality
- ⚡ Optimized performance with Next.js App Router
- 📊 Analytics with Vercel Analytics
- 🔍 SEO optimized with metadata
- 💾 Supabase integration

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Database/Backend**: [Supabase](https://supabase.com/)
- **Content**: [MDX](https://mdxjs.com/) with next-mdx-remote
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📦 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Project Structure

```
src/
  ├── app/               # Next.js App Router structure
  │   ├── components/    # UI components (header, footer, etc.)
  │   ├── lib/           # Utility functions and libraries
  │   ├── blog/          # Blog pages and functionality
  │   ├── api/           # API routes
  │   └── page.tsx       # Home page
  └── content/           # MDX content for blog posts
```

## 🚀 Deployment

This site is deployed on Vercel. Pushing to the main branch will automatically trigger a deployment.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
