"use client";

type Props = {
  fact: string;
};

// Small surprise card shown occasionally beneath the motivation card.
export function DidYouKnow({ fact }: Props) {
  return (
    <section className="rounded-3xl bg-white p-4 text-right shadow-soft ring-1 ring-ocean-100">
      <div className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-ocean-600">
        <span>💡</span>
        <span>הידעת?</span>
      </div>
      <p className="text-sm leading-snug text-stone-700">{fact}</p>
    </section>
  );
}
