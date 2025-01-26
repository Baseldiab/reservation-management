# User Management System

A comprehensive user management system built with modern web technologies, providing a robust solution for handling user data and authentication.

## 🚀 Features

- User authentication (Login, Register, Password Recovery)
- Admin and User dashboards
- Profile management
- User roles and permissions
- Secure API integration
- Real-time notifications
- Responsive design for all devices
- Theme customization (Dark/Light mode)
- Form validation and error handling
- Data caching and optimistic updates

## 🛠️ Tech Stack

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - For enhanced type safety and developer experience
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - High-quality, accessible UI components
- [React Query](https://tanstack.com/query/latest) - Powerful data synchronization
- [React Hook Form](https://react-hook-form.com/) - Performant forms with easy validation
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Axios](https://axios-http.com/) - Promise-based HTTP client

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/your-username/user-management-system.git
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

## 📁 Project Structure

<pre style="background-color: #1a1a1a; color: #fff; padding: 15px; border-radius: 5px; font-family: 'Consolas', monospace;">
project-root/
src/ ├── api/                      <span style="color: #888"># API Integration Layer</span>
    │   ├── config/               <span style="color: #888"># API configuration</span>
    │   ├── routes/              <span style="color: #888"># API endpoints</span>
    │   ├── types/               <span style="color: #888"># TypeScript interfaces</span>
    │   └── enums/               <span style="color: #888"># Enums for app constants</span>
    │
    ├── components/               <span style="color: #888"># Reusable Components</span>
    │   ├── common/              <span style="color: #888"># Shared components</span>
    │   │   ├── loading/        <span style="color: #888"># Loading states</span>
    │   │   ├── no-data/        <span style="color: #888"># Empty states</span>
    │   │   └── table/          <span style="color: #888"># Table components</span>
    │   ├── dialogs/             <span style="color: #888"># Modal dialogs</span>
    │   ├── footer/              <span style="color: #888"># Footer component</span>
    │   ├── layout/              <span style="color: #888"># Layout structure</span>
    │   ├── navbar/              <span style="color: #888"># Navigation</span>
    │   │   └── theme-toggle/    <span style="color: #888"># Theme switcher</span>
    │   ├── rules/               <span style="color: #888"># Form validation rules</span>
    │   └── ui/                  <span style="color: #888"># Base UI components</span>
    │
    ├── pages/                   <span style="color: #888"># Page Components</span>
    │   ├── auth/               <span style="color: #888"># Authentication Pages</span>
    │   │   ├── login/         <span style="color: #888"># Login page</span>
    │   │   ├── register/      <span style="color: #888"># Registration page</span>
    │   │   └── forgot-password/<span style="color: #888"># Password recovery</span>
    │   │
    │   ├── home/               <span style="color: #888"># Home Pages</span>
    │   │   ├── home-admin/    <span style="color: #888"># Admin dashboard</span>
    │   │   │   ├── components/<span style="color: #888"># Admin components</span>
    │   │   │   └── [id].tsx   <span style="color: #888"># Reservation details</span>
    │   │   └── home-user/     <span style="color: #888"># User dashboard</span>
    │   │       ├── components/<span style="color: #888"># User components</span>
    │   │       └── [id].tsx   <span style="color: #888"># User reservation details</span>
    │   │
    │   ├── profile/            <span style="color: #888"># User Profile</span>
    │   │   ├── components/    <span style="color: #888"># Profile components</span>
    │   │   └── edit-profile/  <span style="color: #888"># Profile editing</span>
    │   │
    │   └── users/              <span style="color: #888"># User Management</span>
    │       ├── components/    <span style="color: #888"># User list components</span>
    │       └── reservations/  <span style="color: #888"># User reservations</span>
    │
    ├── hooks/                  <span style="color: #888"># Custom React Hooks</span>
    │   ├── use-toast.ts       <span style="color: #888"># Toast notifications</span>
    │   └── use-auth.ts        <span style="color: #888"># Authentication hook</span>
    │
    ├── lib/                    <span style="color: #888"># Utility Libraries</span>
    │   ├── constants/         <span style="color: #888"># App constants</span>
    │   └── utils.ts          <span style="color: #888"># Helper functions</span>
    │
    ├── providers/              <span style="color: #888"># Context Providers</span>
    │   └── theme-provider.tsx <span style="color: #888"># Theme context</span>
    │
    ├── App.tsx                 <span style="color: #888"># Root component</span>
    ├── router.tsx              <span style="color: #888"># Route definitions</span>
    ├── main.tsx               <span style="color: #888"># Entry point</span>
    └── index.css              <span style="color: #888"># Global styles</span>
</pre>

## 🔑 Key Features Explained

- **Authentication System**: Complete user authentication flow with login, registration, and password recovery
- **Role-Based Access**: Separate dashboards and features for administrators and regular users
- **Profile Management**: Users can view and edit their profile information
- **Responsive Design**: Fully responsive interface that works seamlessly across all devices
- **Theme Support**: Easy switching between light and dark themes
- **Type Safety**: Full TypeScript implementation for better code quality and developer experience
- **Modern State Management**: Efficient state handling with React Query for server state
- **Form Handling**: Robust form management with validation using React Hook Form and Zod
- **Component Library**: Beautifully designed UI components using shadcn/ui
- **API Integration**: Type-safe API calls using Axios with proper error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### 👨‍💻 Author

Developed with ❤️ by [Basel Diab](https://github.com/baseldiab)

---
