import { Button } from '@shared/ui'
import { navigationItems, siteConfig } from '@shared/constants'

const footerGroups = [
  { title: 'Product', links: ['Features', 'Pricing', 'Testimonials', 'Download App', 'Blog'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact', 'Partners'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'] },
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
            {['Instagram', 'X', 'Facebook', 'TikTok'].map((social) => (
              <a
                key={social}
                href="#hero"
                aria-label={social}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 font-bold transition hover:scale-110 hover:bg-primary-500"
              >
                {social[0]}
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
