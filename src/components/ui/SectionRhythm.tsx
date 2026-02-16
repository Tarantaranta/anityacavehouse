import Container from "./Container";

export function SectionKicker({
  label,
  title,
}: {
  label: string;
  title?: string;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-2">
        <span className="h-px w-10 bg-line" />
        {label}
      </div>
      {title ? (
        <h2 className="mt-6 text-3xl md:text-4xl font-light tracking-wide text-ink">
          {title}
        </h2>
      ) : null}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="bg-surface">
      <Container>
        <div className="h-px w-full bg-line/80" />
      </Container>
    </div>
  );
}
