import type { Checklist } from "@/types/checklist";

interface ChecklistSectionHeaderProps {
  checklist: Checklist | null;
}

export function ChecklistSectionHeader({
  checklist,
}: ChecklistSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
          Generated Checklist
        </p>
        <h2 className="mt-2 text-3xl font-bold text-stone-900">
          {checklist ? checklist.title : "No checklist selected yet"}
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-stone-500">
        {checklist
          ? "This is the current working checklist. Toggle items, add your own entries, and save it when you want to reuse it."
          : "Choose a scenario card first. A checklist will appear here with starter items you can edit right away."}
      </p>
    </div>
  );
}
