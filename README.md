# NGO/Business Website with Admin Dashboard

A robust, full-stack Next.js application designed for NGOs and businesses. This platform features a modern public-facing website for showcasing information and blogs, coupled with a secure admin dashboard for determining content management.

## 🚀 Key Features

### 🌐 Public Interface
- **Home & About Pages**: Clean, responsive layouts to showcase your organization's mission and team.
- **Dynamic Blog**: Fully functional blog section with individual post views to keep your audience engaged.
- **Contact Form**: Integrated contact form for user inquiries, saving subtitles directly to the database.
- **Responsive Design**: Optimized for all devices (Mobile, Tablet, Desktop) using Tailwind CSS.

### 🛡️ Admin Dashboard
- **Secure Authentication**: Protected admin routes using NextAuth.js.
- **Content Management (CMS)**:
    - Create, Read, Update, and Delete (CRUD) blog posts.
    - Rich text editing for blog content.
- **Inquiry Management**: View and manage messages received through the contact form.
- **Sidebar Navigation**: Intuitive dashboard layout for easy navigation.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (managed via Mongoose)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ngo-business-site.git
   cd ngo-business-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication (NextAuth)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_super_secret_key

   # Optional: Add other secrets here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📂 Project Structure

```bash
ngo-business-site/
├── app/
│   ├── (public)/        # Public pages (Home, About, Blog, Contact)
│   ├── (admin)/         # Protected admin pages (Dashboard, Posts, Contacts)
│   ├── api/             # API routes (Auth, Posts, Contacts)
│   └── globals.css      # Global styles
├── components/          # Reusable UI components (Navbar, Footer, etc.)
├── lib/                 # Utilities (DB connection, Models)
└── public/              # Static assets
```
