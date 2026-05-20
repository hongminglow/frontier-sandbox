import type { Testimonial } from '@entities/testimonials'

const dogSheet = '/dog-portraits-sheet.png'

export const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <article className="testimonial-card relative flex min-h-80 flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[var(--card-shadow)]">
    <span className="pointer-events-none absolute right-6 top-2 font-heading text-8xl font-extrabold text-primary-100 dark:text-white/5">
      “
    </span>
    <div className="flex items-center gap-4">
      <span
        className="size-16 rounded-2xl bg-cover bg-center shadow-[var(--shadow-md)]"
        style={{
          backgroundImage: `url(${dogSheet})`,
          backgroundPosition: testimonial.position,
          backgroundSize: '300% 200%',
        }}
        role="img"
        aria-label={testimonial.dogs}
      />
      <div>
        <h3 className="font-heading text-xl font-extrabold text-[var(--text-primary)]">
          {testimonial.owner}
        </h3>
        <p className="text-sm font-semibold text-[var(--text-secondary)]">{testimonial.dogs}</p>
      </div>
    </div>
    <div className="mt-5 flex gap-1 text-warning" aria-label={`${testimonial.rating} star rating`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span className="testimonial-star" key={index}>
          ★
        </span>
      ))}
    </div>
    <p className="typing-quote relative mt-5 text-base leading-7 text-[var(--text-secondary)]">
      {testimonial.quote}
    </p>
    <div className="mt-auto pt-5">
      <span className="inline-flex rounded-full gradient-primary px-3 py-1 text-sm font-extrabold text-white">
        {testimonial.match} match
      </span>
    </div>
  </article>
)
