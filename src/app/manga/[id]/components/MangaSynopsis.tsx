interface MangaSynopsisProps {
  synopsis: string | null | undefined;
}

export default function MangaSynopsis({ synopsis }: MangaSynopsisProps) {
  if (!synopsis) return null;

  return (
    <div className="mb-6">
      <h3 className="mb-2 text-xl font-semibold text-neutral-200">
        Описание
      </h3>
      <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-300">
        {synopsis}
      </p>
    </div>
  );
}