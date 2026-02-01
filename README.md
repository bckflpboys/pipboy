# Pipboy Hub

A modern web application built with Next.js 15, TypeScript, and Tailwind CSS, featuring a specialized chat interface, trading bot preview, role-based access control, and more.

## 🚀 Key Features

### PB Chat Bot (Subdomain: pb.localhost:3000)
- **Smart Subdomain Routing**: Specialized chat interface accessed via pb.localhost:3000 subdomain
- **File Upload Functionality**: Support for image, PDF, and document attachments in chat messages
- **Responsive Chat Interface**: Adaptive design with smooth animations and transitions
- **Message Attachments**: Intelligent handling of file attachments with preview capability

### Trading Chat Bot Preview
- **Interactive Landing Page**: Showcasing the trading bot features and capabilities
- **Preview Screenshots**: Mobile and desktop views of the interface
- **Animated UI Elements**: Engaging user interface with micro-interactions
- **Waitlist Registration**: User sign-up system for early access

### Core Platform Features
- **Role-Based Access Control**: Admin-specific features and navigation
- **Authentication System**: Secure user authentication with next-auth
- **Responsive Design**: Mobile-first approach across all pages
- **Dark Theme UI**: Modern dark interface with accent colors

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (for user data and authentication)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/bckflpboys/pipboy-hub.git
cd pipboy-hub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
# Add other required environment variables
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Access the application:
   - Main application: [http://localhost:3000](http://localhost:3000)
   - PB Chat Bot: [http://pb.localhost:3000](http://pb.localhost:3000)

## 🏗️ Build

To create a production build:

```bash
npm run build
# or
yarn build
```

## 🚀 Deployment

The application is configured for deployment on Vercel. Simply push to the main branch, and Vercel will automatically deploy your changes.

## 📁 Project Structure

```
pipboy-hub/
├── app/                # Next.js app directory
│   ├── api/            # API routes and endpoints
│   │   ├── auth/       # Authentication endpoints
│   │   └── users/      # User management endpoints
│   ├── components/     # Shared UI components
│   ├── pb-chat/        # PB Chat Bot interface
│   │   ├── components/ # Chat-specific components
│   │   └── page.tsx    # Main chat interface
│   ├── trading-chatbot/ # Trading bot preview page
│   ├── dashboard/      # User dashboard
│   ├── auth/           # Authentication pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── middleware.ts       # Custom middleware for subdomain routing
├── public/             # Static files and images
├── styles/             # Global styles
└── ...config files     # Various configuration files
```

## 🧩 Key Components

### Chat Interface
- `ChatMessage`: Displays user and bot messages with file attachment support
- `ChatHeader`: Navigation and branding for the chat interface
- `ChatSidebar`: Access to conversation history

### Navigation & Layout
- `Navbar`: Responsive navigation with role-based menu items
- `UserProfile`: User profile display with dropdown menu
- `ProfileDropdown`: User actions menu

### Trading Bot Preview
- Landing page with feature highlights and waitlist registration
- Mobile and desktop screenshots showcase

## 🛠️ Tech Stack

- **Frontend**:
  - [Next.js 15](https://nextjs.org/) - React framework with App Router
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
  - [Framer Motion](https://www.framer.com/motion/) - Animations

- **Authentication & Database**:
  - [NextAuth.js](https://next-auth.js.org/) - Authentication
  - [MongoDB](https://www.mongodb.com/) - Database
  - [Mongoose](https://mongoosejs.com/) - MongoDB ODM

- **UI Components**:
  - [Headless UI](https://headlessui.com/) - Unstyled, accessible components
  - [Heroicons](https://heroicons.com/) - SVG icons

- **Content & Media**:
  - [TipTap](https://tiptap.dev/) - Rich text editor
  - [Cloudinary](https://cloudinary.com/) - Media management
  - [React PDF](https://react-pdf.org/) - PDF rendering

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
