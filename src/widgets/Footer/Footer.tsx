import { Button } from '@shared/ui'
import { navigationItems, siteConfig } from '@shared/constants'

const footerGroups = [
  { title: 'Product', links: ['Features', 'Pricing', 'Testimonials', 'Download App', 'Blog'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact', 'Partners'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'] },
] as const

const socialLinks = [
  {
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
        <path
          d="M4 4h4.6l4.1 5.5L17.2 4H21l-6.9 8 7.2 10h-4.6l-4.6-6.2L7 22H3.2l7.3-8.6L4 4Zm2.2 1.8 11.6 16.4h1.7L7.9 5.8H6.2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
        <path
          d="M14.3 8.4V6.8c0-.8.5-1 1.1-1h2V2.5A26 26 0 0 0 14.5 2c-2.9 0-4.8 1.7-4.8 4.9v1.5H6.5V12h3.2v10h4.1V12h3.1l.5-3.6h-3.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
        <path
          d="M15.7 2c.4 3 2 4.8 4.8 5v3.4a8 8 0 0 1-4.8-1.6v6.5c0 4.2-2.6 6.7-6.2 6.7a6.2 6.2 0 0 1 0-12.4c.4 0 .8 0 1.2.1v3.7a3 3 0 0 0-1.2-.2 2.6 2.6 0 1 0 2.6 2.6V2h3.6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
] as const

export const Footer = ({ id }: { id?: string }) => (
  <footer id={id} className="bg-neutral-900 py-12 text-white dark:bg-neutral-950">
    <div className="section-shell">
      <div className="mb-12 rounded-2xl gradient-primary p-6 shadow-[var(--shadow-glow-lg)] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-extrabold">Join 50,000+ dog lovers</h2>
            <p className="mt-2 text-white/80">Get local playdate ideas and PawMatch launch updates.</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              aria-label="Email address"
              placeholder="you@example.com"
              className="min-h-12 rounded-full border border-white/25 bg-white/15 px-5 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-3 font-heading text-3xl font-extrabold">
            <span className="inline-flex size-11 items-center justify-center rounded-full gradient-primary text-xl">
              🐾
            </span>
            {siteConfig.brandName}
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/70">{siteConfig.tagline}</p>
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#hero"
                aria-label={social.label}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 font-bold transition hover:scale-110 hover:bg-primary-500"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading text-lg font-extrabold">{group.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href={
                        navigationItems.find((item) => item.label === link)?.href ?? '#hero'
                      }
                      className="text-sm text-white/68 transition hover:text-primary-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
        © 2026 {siteConfig.brandName}. All rights reserved. Made with ♥ for dogs everywhere.
      </div>
    </div>
  </footer>
)
