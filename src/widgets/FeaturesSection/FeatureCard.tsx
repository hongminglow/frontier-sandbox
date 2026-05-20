type FeatureCardProps = {
  icon: string
  title: string
  copy: string
}

export const FeatureCard = ({ icon, title, copy }: FeatureCardProps) => (
  <article className="feature-card tilt-card flex min-h-56 flex-col gap-5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[var(--card-shadow)]">
    <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary-50 text-3xl text-primary-600 dark:bg-white/10 dark:text-primary-100">
      {icon}
    </span>
    <div className="flex flex-col gap-3">
      <h3 className="font-heading text-2xl font-extrabold text-[var(--text-primary)]">{title}</h3>
      <p className="text-sm leading-6 text-[var(--text-secondary)]">{copy}</p>
    </div>
  </article>
)
