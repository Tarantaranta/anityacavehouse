export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-light tracking-wide text-ink">
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-xl md:text-2xl font-light text-ink leading-relaxed max-w-3xl">
      {children}
    </p>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-base md:text-lg text-ink-2 leading-relaxed max-w-3xl">
      {children}
    </p>
  );
}

export function ClosingLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-14 text-2xl md:text-3xl font-light tracking-wide text-ink leading-snug max-w-3xl">
      {children}
    </p>
  );
}
