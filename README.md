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
src/ ├── api/                      <span style="color: #888"># API Integration Layer</span>
    │   ├── config/               <span style="color: #888"># API configuration</span>
    │   ├── routes/              <span style="color: #888"># API endpoints</span>
    │   ├── types/               <span style="color: #888"># TypeScript interfaces</span>
    │   └── enums/               <span style="color: #888"># Enums for app constants</span>
    │
    ├── components/               <span style="color: #888"># Reusable Components</span>
    │   ├── common/              <span style="color: #888"># Shared components</span>
    │   ├── layout/              <span style="color: #888"># Layout structure</span>
    │   ├── ui/                  <span style="color: #888"># Base UI components</span>
    │   └── rules/               <span style="color: #888"># Form validation rules</span>
    │
    ├── pages/                   <span style="color: #888"># Page Components</span>
    │   ├── auth/               <span style="color: #888"># Authentication pages</span>
    │   ├── home/               <span style="color: #888"># Dashboard pages</span>
    │   ├── profile/            <span style="color: #888"># User profile</span>
    │   └── users/              <span style="color: #888"># User management</span>
    │
    ├── hooks/                  <span style="color: #888"># Custom React Hooks</span>
    ├── lib/                    <span style="color: #888"># Utility Libraries</span>
    ├── providers/              <span style="color: #888"># Context Providers</span>
    └── App.tsx                 <span style="color: #888"># Root component</span>
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
