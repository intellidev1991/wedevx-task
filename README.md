# WEDEVX Task

## Demo Credentials for admin login

- **Email**: admin@alma.com
- **Password**: password123

## Setup Guide

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd <your-project-directory>
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## Design Document

### Overview

This project is a web application for my task on WEDEVX.

### Key Design Choices

- **Next.js App Router**: Enables server-side rendering, API routes, and file-based routing.
- **TypeScript**: Ensures type safety across the codebase.
- **React Hook Form + Zod**: Used for robust form validation and type-safe schemas.
- **shadcn/ui**: Provides accessible, customizable UI components (e.g., Checkbox, Drawer).
- **Component-based architecture**: UI is broken into reusable components (e.g., LeadForm, LeadTable, SearchBar).
- **Responsive Design**: Uses Tailwind CSS for utility-first, responsive layouts.
- **Admin Authentication**: Custom hook (`useAuth`) manages authentication state and guards admin routes.
- **API Layer**: All data fetching and mutations are abstracted in `/lib/api.ts`.
- **Debounced Search**: The admin dashboard search uses a debounced input for efficient filtering.

### Architecture

```
/app
  /admin         # Admin dashboard pages
  /login         # Login page
/components
  /leads         # LeadTable, SearchBar, StatusFilter, etc.
  /public        # Public-facing components (LeadForm)
  /ui            # Shared UI components (Button, Checkbox, Drawer, etc.)
  /layout        # Layout components (AdminLayout)
  /dashboard     # Dashboard-specific components (Footer, etc.)
/lib
  api.ts         # API calls for leads, authentication, etc.
  ...
/hooks
  useAuth.ts     # Authentication logic
  use-debounce-value.ts # Debounce hook for search
/types
  index.ts       # TypeScript types (Lead, Visa, etc.)
```

- **State Management**: Local state via React hooks; global state (auth) via custom hooks.
- **Form Handling**: All forms use `react-hook-form` with `zodResolver` for validation.
- **Mobile Support**: Admin sidebar uses shadcn Drawer for mobile navigation.

---

## Additional Documentation

### UI Components

- Used `shadcn/ui` for UI elements.

### Custom Hooks

- **useAuth**: Handles login, logout, and user state.
- **useDebounceValue**: Debounces a value for search/filtering.

### Accessibility

- All interactive elements use accessible shadcn/ui components.
- All custom components are built with accessibility aria-labels.

---

## Contact

Hamed Taheri

Email: hamed.taheri32@gmail.com
