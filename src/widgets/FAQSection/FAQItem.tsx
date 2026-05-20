import type { FAQEntry } from '@entities/faq'
import { cn } from '@shared/lib'

type FAQItemProps = {
  item: FAQEntry
  isOpen: boolean
  onToggle: () => void
}

export const FAQItem = ({ item, isOpen, onToggle }: FAQItemProps) => {
  return (
    <article className="faq-item border-b border-[var(--border-color)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-heading text-xl font-extrabold text-[var(--text-primary)]">{item.question}</span>
        <span
          className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-2xl transition duration-300 ${
            isOpen ? 'rotate-45 text-primary-500' : 'text-[var(--text-secondary)]'
          }`}
        >
          +
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out',
          isOpen ? 'max-h-44 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <p className="max-w-3xl pb-5 pr-12 text-base leading-7 text-[var(--text-secondary)]">{item.answer}</p>
      </div>
    </article>
  )
}
