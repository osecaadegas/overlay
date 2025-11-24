# Twitch OAuth with Supabase Permissions Manager

A Next.js application that provides Twitch OAuth authentication and user permissions management using Supabase.

## Features

- 🎮 Twitch OAuth authentication
- 👥 User permissions management
- 🔒 Secure admin panel
- 💾 Supabase database integration
- 🎨 Modern UI with Tailwind CSS
- ⚡ Next.js App Router

## Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- A Twitch application (for OAuth credentials)

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL script from `supabase_schema.sql` to create the required table
4. Copy your project URL and API keys from Settings > API

### 2. Twitch Application Setup

1. Go to [Twitch Developer Console](https://dev.twitch.tv/console)
2. Create a new application
3. Set OAuth Redirect URL to: `http://localhost:3000/api/auth/callback/twitch`
4. Copy your Client ID and Client Secret

### 3. Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   TWITCH_CLIENT_ID=your_twitch_client_id
   TWITCH_CLIENT_SECRET=your_twitch_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_a_random_secret_here
   ```

3. Generate a secret for `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel page
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # NextAuth configuration
│   │   │   └── permissions/# Permissions API
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   └── lib/
│       └── supabase.ts     # Supabase client configuration
├── supabase_schema.sql     # Database schema
└── .env.local.example      # Environment variables template
```

## Usage

### Authentication

1. Visit the home page
2. Click "Sign in with Twitch"
3. Authorize the application
4. You'll be redirected back to the app

### Managing Permissions

1. Navigate to `/admin` or click "Admin Panel"
2. Sign in if not already authenticated
3. Use the form to add/update user permissions:
   - Enter Twitch User ID
   - Enter username
   - Enter comma-separated permissions (e.g., `read, write, admin`)
4. View all users and their permissions in the table
5. Delete users as needed

## API Routes

- `GET /api/permissions` - Fetch all users and permissions
- `POST /api/permissions` - Add or update user permissions
- `DELETE /api/permissions?user_id=xxx` - Delete a user

## Security Notes

- The `SUPABASE_SERVICE_ROLE_KEY` should never be exposed to the client
- All API routes check for authentication
- Supabase Row Level Security (RLS) is enabled
- Store `.env.local` securely and never commit it to version control

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js with Twitch provider
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Troubleshooting

- **OAuth not working**: Check that your Twitch redirect URL matches exactly
- **Database errors**: Verify your Supabase credentials and that the schema is created
- **Session issues**: Make sure `NEXTAUTH_SECRET` is set and `NEXTAUTH_URL` matches your deployment URL

## License

MIT
