# Editing Content — What to Change and Where It Shows

> All content lives in `src/data/`. Edit a file there, save, and the browser updates.
> You never need to open a component to change text, links, or numbers.

> Note: filenames follow the project spec. If yours differ slightly, open `src/data/`
> and match by what each file contains.

## Quick reference — file to section

| Edit this file | Changes this on the site |
|---|---|
| `data/profile.ts` | Your name, headline/tagline, about text, location, resume link |
| `data/navigation.ts` | The navbar links |
| `data/skills.ts` | Skill categories, skills, icons, proficiency levels |
| `data/experience.ts` | Work history — companies, roles, dates, bullet points |
| `data/projects.ts` | Project cards — title, description, tech, links |
| `data/articles.ts` | Blog/article cards |
| `data/achievements.ts` | Achievement cards |
| `data/testimonials.ts` | Testimonial carousel |
| `data/socials.ts` | GitHub, LinkedIn, X, email links (hero + contact + footer) |
| `data/stats.ts` | The stat cards in About (years, projects, etc.) |
| `data/seo.ts` | Page title, description, domain, share-preview text |
| `heroCubeContent.ts` | The symbols on the 3D cube faces |
| `heroCubeConfig.ts` | Cube behavior — covered in doc 3 (animations) |

## Common edits

### Change your name / headline / about text
Open `data/profile.ts`. Edit the name, positioning line, and about paragraphs.
Shows up in: the hero, the About section, the navbar name, and browser tab title.

### Change social links
Open `data/socials.ts`. Update each URL (and your email).
Shows up in: hero icons, contact section, footer. One edit updates all three.

### Add or edit a project
Open `data/projects.ts`. Each project is an object with title, description, tech list,
GitHub URL, and live-demo URL. Add a new object to the array to add a card.

### Add or edit work experience
Open `data/experience.ts`. Each role has company, title, duration, location, and a
`bullets` array. Add/edit bullets to change the points shown under each role.

### Change skills
Open `data/skills.ts`. Skills are grouped by category. Each skill has a name, an icon
reference, and a proficiency level. Remove a skill by deleting its entry; add one by
adding an entry to the right category.

### Change the stat numbers
Open `data/stats.ts`. Edit the value and label for each stat card.
Tip: if a stat is "0" (e.g. articles written), consider removing that stat entirely
rather than showing a zero.

### Point the resume button at your file
Put your resume PDF in the `public/` folder (e.g. `public/resume.pdf`), then set the
resume path in `data/profile.ts` (or wherever the resume link is defined) to
`/resume.pdf`.

### Make the contact form actually deliver mail
1. Get a free access key at web3forms.com (just enter the email you want messages sent to).
2. Create a file named `.env.local` in the project root.
3. Add this line:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
   ```
4. Restart `pnpm dev`.
Until you do this, the form shows a "not configured" state — the site still builds and
runs fine without it.

### Swap a placeholder image for a real one
Images use a placeholder (gradient + label) until you add a real file. To use a real
image, set the image path in that item's data entry (e.g. a project's image field) to a
file you've put in `public/`. Leaving it empty keeps the placeholder.

## The golden rule

If you're about to edit a file inside `src/components/` to change wording, a number, or a
link — stop. That value lives in `src/data/`. Editing components is only for changing how
something looks or behaves, never for content.
