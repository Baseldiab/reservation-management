# Reservation Management System

A comprehensive hotel reservation management system built with modern web technologies, enabling users to book and manage hotel reservations while administrators oversee and control all bookings through a centralized dashboard.

## 🚀 Features

- **Authentication System**

  - Secure user authentication (Login, Register, Password Recovery)
  - Role-based access control (Admin/User)
  - Profile management with editable user details

- **Reservation Management**

  - Create, view, edit and cancel reservations
  - Real-time status updates (Pending, Approved, Cancelled)
  - Room type selection (Single, Double, Triple, Suite)
  - Date range selection for bookings
  - Guest count management

- **Admin Dashboard**

  - Comprehensive reservation overview
  - User management interface
  - Booking approval/rejection system
  - Advanced filtering and search capabilities
  - Detailed analytics and reports

- **User Interface**
  - Responsive design for all devices
  - Dark/Light theme support
  - Real-time notifications
  - Intuitive booking interface
  - Form validation with error handling

## 🛠️ Tech Stack

- **Frontend Framework**

  - [React](https://reactjs.org/) - UI library
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [Vite](https://vitejs.dev/) - Build tool

- **Styling & UI**

  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
  - [shadcn/ui](https://ui.shadcn.com/) - Component library
  - [Framer Motion](https://www.framer.com/motion/) - Animations

- **State Management & Data Fetching**

  - [React Query](https://tanstack.com/query/latest) - Server state
  - [Zustand](https://zustand-demo.pmnd.rs/) - Client state
  - [Axios](https://axios-http.com/) - HTTP client

- **Form Handling & Validation**
  - [React Hook Form](https://react-hook-form.com/) - Form management
  - [Zod](https://zod.dev/) - Schema validation

## 📁 Project Structure

<pre style="background-color: #1a1a1a; color: #fff; padding: 15px; border-radius: 5px; font-family: 'Consolas', monospace;">
project-root/
├── public/                    <span style="color: #888"># Public assets</span>
│   └── favicon.ico           <span style="color: #888"># Site favicon</span>
│
├── src/                      <span style="color: #888"># Source code</span>
│   ├── api/                  <span style="color: #888"># API Integration Layer</span>
│   │   ├── config/          <span style="color: #888"># API configuration</span>
│   │   │   └── axios.ts
│   │   ├── routes/          <span style="color: #888"># API endpoints</span>
│   │   │   ├── auth.ts
│   │   │   ├── reservation.ts
│   │   │   └── user.ts
│   │   ├── types/          <span style="color: #888"># TypeScript interfaces</span>
│   │   │   ├── auth.ts
│   │   │   ├── reservation.ts
│   │   │   └── user.ts
│   │   └── enums/          <span style="color: #888"># Application enums</span>
│   │       └── enums.ts
│   │
│   ├── components/          <span style="color: #888"># Reusable Components</span>
│   │   ├── common/         <span style="color: #888"># Shared components</span>
│   │   │   ├── loading.tsx
│   │   │   ├── noData.tsx
│   │   │   └── reservation-table.tsx
│   │   ├── footer/         <span style="color: #888"># Footer components</span>
│   │   │   └── footer.tsx
│   │   ├── layout/         <span style="color: #888"># Layout components</span>
│   │   │   └── layout.tsx
│   │   ├── navbar/         <span style="color: #888"># Navigation components</span>
│   │   │   ├── menu-navbar.tsx
│   │   │   ├── navbar.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── rules/          <span style="color: #888"># Validation rules</span>
│   │   │   └── rules.ts
│   │   └── ui/            <span style="color: #888"># UI components from shadcn</span>
│   │       ├── alert-dialog.tsx
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── table.tsx
│   │       ├── toast.tsx
│   │       └── toaster.tsx
│   │
│   ├── hooks/             <span style="color: #888"># Custom React Hooks</span>
│   │   ├── use-auth.ts
│   │   ├── use-media-query.ts
│   │   └── use-theme.ts
│   │
│   ├── lib/               <span style="color: #888"># Utility Libraries</span>
│   │   ├── constants/     <span style="color: #888"># Constants</span>
│   │   │   ├── navbar.ts
│   │   │   └── theme.ts
│   │   └── utils.ts      <span style="color: #888"># Utility functions</span>
│   │
│   ├── pages/             <span style="color: #888"># Page Components</span>
│   │   ├── auth/         <span style="color: #888"># Authentication pages</span>
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── reset-password.tsx
│   │   ├── home/         <span style="color: #888"># Home pages</span>
│   │   │   ├── home-admin/
│   │   │   │   ├── components/
│   │   │   │   │   ├── add-edit-reservation.tsx
│   │   │   │   │   ├── reservation-filter.tsx
│   │   │   │   │   ├── reservation-search.tsx
│   │   │   │   │   ├── reservation-table.tsx
│   │   │   │   │   └── reservation-table-options.tsx
│   │   │   │   └── reservation[id].tsx
│   │   │   ├── home-user/
│   │   │   │   ├── components/
│   │   │   │   │   ├── add-edit-reservation.tsx
│   │   │   │   │   ├── reservation-filter.tsx
│   │   │   │   │   ├── reservation-search.tsx
│   │   │   │   │   ├── reservation-table.tsx
│   │   │   │   │   └── reservation-table-options.tsx
│   │   │   │   └── reservation[id].tsx
│   │   │   └── home-page.tsx
│   │   ├── profile/     <span style="color: #888"># Profile pages</span>
│   │   │   ├── components/
│   │   │   │   └── edit-profile.tsx
│   │   │   └── profile-page.tsx
│   │   └── users/      <span style="color: #888"># User management</span>
│   │       ├── components/
│   │       │   ├── add-edit-user.tsx
│   │       │   ├── user-filter.tsx
│   │       │   ├── user-search.tsx
│   │       │   ├── users-table.tsx
│   │       │   └── user-table-options.tsx
│   │       ├── user-reservation/
│   │       │   └── components/
│   │       │       ├── add-edit-reservation.tsx
│   │       │       ├── reservation-filter.tsx
│   │       │       ├── reservation-search.tsx
│   │       │       └── reservation-table-options.tsx
│   │       └── users-page.tsx
│   │
│   ├── providers/        <span style="color: #888"># Context Providers</span>
│   │   ├── auth-provider.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── store/           <span style="color: #888"># State Management</span>
│   │   └── use-store.ts
│   │
│   ├── styles/          <span style="color: #888"># Global Styles</span>
│   │   └── globals.css
│   │
│   ├── App.css
│   ├── App.tsx         <span style="color: #888"># Root component</span>
│   ├── index.css
│   └── main.tsx       <span style="color: #888"># Entry point</span>
│
├── .env              <span style="color: #888"># Environment variables</span>
├── .eslintignore    <span style="color: #888"># ESLint ignore patterns</span>
├── .eslintrc        <span style="color: #888"># ESLint rules</span>
├── .gitignore       <span style="color: #888"># Git ignore rules</span>
├── .prettierignore  <span style="color: #888"># Prettier ignore patterns</span>
├── .prettierrc      <span style="color: #888"># Prettier configuration</span>
├── components.json   <span style="color: #888"># ShadCN UI config</span>
├── eslint.config.js <span style="color: #888"># ESLint configuration</span>
├── index.html       <span style="color: #888"># HTML entry point</span>
├── package.json     <span style="color: #888"># Project dependencies</span>
├── postcss.config.js <span style="color: #888"># PostCSS configuration</span>
├── README.md        <span style="color: #888"># Project documentation</span>
├── tailwind.config.js <span style="color: #888"># Tailwind configuration</span>
├── tsconfig.json    <span style="color: #888"># TypeScript configuration</span>
├── tsconfig.app.json <span style="color: #888"># App TypeScript config</span>
├── tsconfig.node.json <span style="color: #888"># Node TypeScript config</span>
├── vercel.json      <span style="color: #888"># Vercel deployment config</span>
└── vite.config.ts   <span style="color: #888"># Vite configuration</span>
</pre>

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/your-username/reservation-management-system.git
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_API_KEY=your_api_key
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Developed with ❤️ by [Basel Diab](https://github.com/baseldiab)

---
