type PricingToggleProps = {
  billing: 'monthly' | 'yearly'
  onChange: (billing: 'monthly' | 'yearly') => void
}

export const PricingToggle = ({ billing, onChange }: PricingToggleProps) => (
  <div className="mx-auto mb-10 flex w-fit rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] p-1 shadow-[var(--shadow-md)]">
    {(['monthly', 'yearly'] as const).map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => onChange(option)}
        className={`relative min-h-11 rounded-full px-5 text-sm font-extrabold capitalize transition ${
          billing === option ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
      >
        {billing === option && <span className="absolute inset-0 rounded-full gradient-primary" aria-hidden="true" />}
        <span className="relative">{option}</span>
      </button>
    ))}
  </div>
)
