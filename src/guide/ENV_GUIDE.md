# Environment Variables — Secrets & Config

Some settings don't belong in the code — either because they're secret, or because
they change per environment (your machine vs. the live site). These live in
environment variables, kept in a `.env.local` file that is **never committed to git**.

## The file

Create a file named exactly `.env.local` in the project root (same folder as
`package.json`). It's already git-ignored, so it stays on your machine and never gets
pushed to GitHub.

```
NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-key-here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

After creating or changing this file, **restart the dev server** (`Ctrl+C`, then
`pnpm dev`) — Next.js only reads env files on startup.

## What each one does

| Variable | What it's for | Required? |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Makes the contact form deliver mail. Without it, the form shows a "not configured" message but the site still works. | For a working contact form |
| `NEXT_PUBLIC_SITE_URL` | Your real deployed domain. Used for the canonical URL and social-share previews (OpenGraph). Without it, these default to a placeholder. | Before going live |

### Getting the Web3Forms key
1. Go to web3forms.com.
2. Enter the email address where you want contact messages delivered.
3. Copy the access key they give you (no account needed).
4. Paste it as `NEXT_PUBLIC_WEB3FORMS_KEY`.

Note: this key is **public by design** — it only identifies which mailbox to send to,
it doesn't authorise anything. That's why it's a `NEXT_PUBLIC_` variable and why the
site builds fine without it. It's safe for it to appear in the browser.

### Setting the site URL
Set `NEXT_PUBLIC_SITE_URL` to wherever the site is deployed — your custom domain
(`https://dhanush.dev`) or the Vercel URL you get for free
(`https://your-project.vercel.app`). This fixes the `https://example.com` placeholder
in the page's canonical/OpenGraph tags.

## The `NEXT_PUBLIC_` prefix

Anything starting with `NEXT_PUBLIC_` is sent to the browser — use it only for values
that are safe to be public (like the two above). A real secret (a private API key, a
database password) would NOT use this prefix, so it stays server-only. This project has
no server secrets, so both its variables are `NEXT_PUBLIC_`.

## Important: never commit `.env.local`

Confirm your `.gitignore` includes a line like `.env*` or `.env.local` (Next.js adds
this by default). This keeps your file off GitHub. If you ever put a real secret in an
env file, a leaked `.env` in a public repo is a genuine security problem — so always
check before pushing.

## Deploying (Vercel and similar)

Your `.env.local` stays on your machine — it is NOT uploaded. On the host, you set the
same variables through their dashboard:

- Vercel: Project → Settings → Environment Variables → add
  `NEXT_PUBLIC_WEB3FORMS_KEY` and `NEXT_PUBLIC_SITE_URL` there, then redeploy.

The site runs fine with none of these set — the contact form just shows its
"not configured" state and the URLs fall back to a placeholder — so nothing breaks if
you forget one. Set them when you're ready for the contact form and correct share links.