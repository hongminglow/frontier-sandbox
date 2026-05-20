import type { DogProfile } from '@entities/dog'

export const BreedCard = ({ dog }: { dog: DogProfile }) => (
  <article className="breed-card group relative h-full min-h-72 overflow-hidden rounded-2xl border border-white/60 bg-[var(--card-bg)] shadow-[var(--card-shadow)] dark:border-white/10">
    <div
      className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
      style={{
        backgroundImage: `url(${dog.image})`,
        backgroundPosition: dog.position,
        backgroundSize: '300% 200%',
      }}
      role="img"
      aria-label={`${dog.name}, ${dog.breed}`}
    />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/80 to-transparent p-5 text-white">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="font-heading text-2xl font-extrabold">{dog.name}</h3>
          <p className="mt-1 text-sm font-semibold text-white/82">{dog.breed}</p>
        </div>
        <span className="rounded-full bg-white/18 px-3 py-1 text-sm font-extrabold backdrop-blur">
          {dog.match}
        </span>
      </div>
    </div>
  </article>
)
