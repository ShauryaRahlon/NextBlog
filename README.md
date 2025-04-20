# NextBlog

This is a blog application built with Next.js 15 (App Router), demonstrating features like user authentication, database interaction with Prisma, and server actions.

## Key Technologies

- **Framework:** [Next.js](https://nextjs.org/) 15 (with Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication:** [Kinde](https://kinde.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL (assumed, based on Prisma setup)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) 
- **Linting:** ESLint
- **Package Manager:** pnpm

## Project Structure

```
.
├── app/                      # Next.js App Router directory
│   ├── api/                  # API routes (Kinde auth)
│   ├── dashboard/            # Authenticated user dashboard pages
│   │   ├── create/           # Page for creating new blog posts
│   │   └── page.tsx          # Dashboard landing page
│   ├── utils/                # Utility functions (Prisma client)
│   ├── actions.ts            # Server Actions (e.g., handleSubmission)
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (displays latest posts)
├── Components/               # React components
│   ├── general/              # General components (Navbar, AuthProvider)
│   └── ui/                   # UI components (likely shadcn/ui)
├── lib/                      # Library functions (e.g., utils.ts)
├── prisma/                   # Prisma configuration
│   └── schema.prisma         # Database schema definition
├── public/                   # Static assets
├── .env.local                # Environment variables (Needs to be created)
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Readme File
```

## Getting Started

### Prerequisites

- Node.js (Check `.nvmrc` or `package.json` engines if specified, otherwise use a recent LTS version)
- pnpm (v10.7.0 or compatible, see `packageManager` in `package.json`)
- PostgreSQL Database (or adjust `prisma/schema.prisma` and `.env.local` for a different database)
- Kinde account for authentication credentials.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ShauryaRahlon/NextBlog
    cd NextBlog
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables, replacing the placeholder values with your actual credentials:

    ```env
    # Prisma Database URL
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # Kinde Authentication Variables
    KINDE_CLIENT_ID="your_kinde_client_id"
    KINDE_CLIENT_SECRET="your_kinde_client_secret"
    KINDE_ISSUER_URL="https://your_kinde_domain.kinde.com"
    KINDE_SITE_URL="http://localhost:3000" # Or your deployment URL
    KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000" # Or your deployment URL
    KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard" # Or your desired redirect
    ```

4.  **Apply database migrations:**
    ```bash
    pnpm prisma migrate dev
    ```

### Running the Development Server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

- **Blog Post Display:** The home page fetches and displays the latest blog posts.
- **User Authentication:** Uses Kinde for login, logout, and session management.
- **Protected Dashboard:** The `/dashboard` route is likely protected and requires authentication.
- **Blog Post Creation:** Authenticated users can create new blog posts via `/dashboard/create` using a form handled by a Server Action (`app/actions.ts`).
- **Server Actions:** Form submissions are handled securely on the server using Next.js Server Actions.
- **Database Interaction:** Prisma is used to interact with the database for creating and fetching posts.
