# NEXORA — Business Solutions & Growth

Official NEXORA agency website.

**Build. Automate. Grow.**

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4 with a bespoke CSS design system
- Supabase for project enquiries and the protected lead dashboard

## Local development

1. Install Node.js 20.9 or newer.
2. Install dependencies: `npm install`.
3. Copy `.env.example` to `.env.local` and add the Supabase publishable key (the legacy anon key is also supported).
4. Start the server: `npm run dev`.
5. Open `http://localhost:3000`.

## Supabase

The project expects the already-provisioned `public.project_enquiries` table, with row-level security enabled.

- Public visitors can submit enquiries.
- Anonymous users cannot read enquiries.
- The admin dashboard requires an authenticated user whose JWT `app_metadata.role` is `admin`.
- Never put a Supabase service-role key in a browser or public environment variable.

To provision an administrator, create the user in Supabase Authentication and assign the trusted app metadata claim `{ "role": "admin" }` through the Supabase dashboard or a secure administrative process. Do not use user-editable metadata for this role. Sign in at `/admin`.

## Enquiry form

The form writes to `public.project_enquiries`: name, email, phone, company, service_interest, budget_range, timeline, message and consent_to_contact. The database supplies the record ID, timestamp and default status. A server-side Resend notification is optional and is only sent when all three mail environment variables are configured.

## Deploying

Connect this repository to Vercel and configure:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (preferred) or legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Optional mail settings shown in `.env.example`

Use a Vercel plan whose terms permit commercial agency use before deploying the public business website. Configure a custom domain only after the owner approves launch.

## Brand system

- Emerald: `#0B5D46`
- Gold: `#D4AF37`
- Midnight: `#0E0E0E`
- Cream: `#F7F1E3`

The interface uses the approved shield/N direction without laurel branches or additional heraldic decoration. The logo is an inline vector mark so it stays crisp at every size.
