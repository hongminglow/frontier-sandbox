type StepCardProps = {
  number: string
  icon: string
  title: string
  copy: string
}

export const StepCard = ({ number, icon, title, copy }: StepCardProps) => (
  <article className="step-card tilt-card relative flex min-h-64 flex-col gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[var(--card-shadow)]">
    <span className="absolute right-5 top-5 font-heading text-5xl font-extrabold text-primary-100 dark:text-white/10">
      {number}
    </span>
    <span className="inline-flex size-14 items-center justify-center rounded-2xl gradient-primary text-3xl text-white shadow-[var(--shadow-glow)]">
      {icon}
    </span>
    <div className="mt-auto flex flex-col gap-3">
      <h3 className="font-heading text-2xl font-extrabold text-[var(--text-primary)]">{title}</h3>
      <p className="text-sm leading-6 text-[var(--text-secondary)]">{copy}</p>
    </div>
  </article>
)
