# User Management System

A modern user management system built with React, TypeScript, and Vite, featuring a clean architecture and robust state management.

## 🚀 Features

- CRUD operations for user management
- Form validation with Zod schema
- Toast notifications for user feedback
- Responsive design with Tailwind CSS
- Dark/Light theme support
- Modern UI components with shadcn/ui
- Type-safe API calls with Axios
- State management with React Query

## 🛠️ Tech Stack

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [React Query](https://tanstack.com/query/latest) - Server State Management
- [React Hook Form](https://react-hook-form.com/) - Form Management
- [Zod](https://zod.dev/) - Schema Validation
- [Axios](https://axios-http.com/) - HTTP Client

## 📁 Project Structure

<pre style="background-color: #1a1a1a; color: #fff; padding: 15px; border-radius: 5px; font-family: 'Consolas', monospace;">
project-root/
src/ ├── api/                      <span style="color: #888"># API Integration Layer</span>
    │   ├── config/               <span style="color: #888"># API configuration and setup</span>
    │   ├── routes/              <span style="color: #888"># API endpoints and handlers</span>
    │   └── types/               <span style="color: #888"># TypeScript interfaces and types</span>
    │
    ├── components/               <span style="color: #888"># Reusable Components</span>
    │   ├── dialogs/             <span style="color: #888"># Modal dialogs</span>
    │   │   └── confirmDelete/   <span style="color: #888"># Delete confirmation dialog</span>
    │   ├── error/               <span style="color: #888"># Error handling components</span>
    │   ├── footer/              <span style="color: #888"># Footer components</span>
    │   ├── icons/               <span style="color: #888"># SVG and icon components</span>
    │   ├── layout/              <span style="color: #888"># Layout structure components</span>
    │   ├── navbar/              <span style="color: #888"># Navigation components</span>
    │   │   └── theme_toggle/    <span style="color: #888"># Theme switching component</span>
    │   ├── providers/           <span style="color: #888"># Context providers</span>
    │   └── ui/                  <span style="color: #888"># Base UI components</span>
    │
    ├── pages/                   <span style="color: #888"># Page Components</span>
    │   └── home/               <span style="color: #888"># Home page</span>
    │       ├── components/     <span style="color: #888"># Page-specific components</span>
    │       │   ├── user-form/  <span style="color: #888"># User form component</span>
    │       │   └── users-table/<span style="color: #888"># Users table component</span>
    │       │   └── search-user/<span style="color: #888"># Users search component</span>
    │       │   └── filter-users/<span style="color: #888"># Users filter component</span>
    │       └── home-page.tsx   <span style="color: #888"># Main home page component</span>
    │
    ├── lib/                    <span style="color: #888"># Utility Libraries</span>
    │   └── utils.ts           <span style="color: #888"># Helper functions</span>
    │
    ├── hooks/                  <span style="color: #888"># Custom React Hooks</span>
    │   └── use-toast.ts       <span style="color: #888"># Toast notifications hook</span>
    │
    ├── App.tsx                 <span style="color: #888"># Root App component</span>
    ├── router.tsx              <span style="color: #888"># Route definitions</span>
    ├── main.tsx               <span style="color: #888"># Entry point</span>
    └── index.css              <span style="color: #888"># Global styles</span>
</pre>

---

### 👨‍💻 Author

Developed with ❤️ by <a href="https://github.com/baseldiab" target="_blank">Basel Diab</a>

---
