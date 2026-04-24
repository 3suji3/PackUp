import type { Checklist } from "@/types/checklist";

interface SavedChecklistListProps {
  savedChecklists: Checklist[];
  currentChecklistId: string | null;
  onSelectChecklist: (checklistId: string) => void;
  onDeleteChecklist: (checklistId: string) => void;
}

export function SavedChecklistList({
  savedChecklists,
  currentChecklistId,
  onSelectChecklist,
  onDeleteChecklist,
}: SavedChecklistListProps) {
  if (savedChecklists.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-center text-sm leading-7 text-stone-500">
        No saved checklist yet. Save the current checklist to reuse it here later.
      </div>
    );
  }

  return (
    <ul className="grid gap-3">
      {savedChecklists.map((checklist) => {
        const isActive = checklist.id === currentChecklistId;
        const checkedCount = checklist.items.filter((item) => item.checked).length;

        return (
          <li key={checklist.id}>
            <div
              className={`rounded-[24px] border px-5 py-4 transition ${
                isActive
                  ? "border-orange-300 bg-orange-50/80 shadow-[0_12px_30px_rgba(199,144,98,0.14)]"
                  : "border-stone-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
              }`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                    {checklist.scenario}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectChecklist(checklist.id)}
                    className="mt-2 block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <h3 className="truncate text-lg font-bold text-stone-900">
                      {checklist.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-500">
                      {checkedCount}/{checklist.items.length} items checked
                    </p>
                  </button>
                </div>
                <div className="shrink-0 text-sm text-stone-500 md:text-right">
                  <p className="font-semibold text-stone-700">
                    {new Date(checklist.updatedAt).toLocaleString("ko-KR")}
                  </p>
                  <p className="mt-1">
                    {isActive ? "Currently selected" : "Saved checklist"}
                  </p>
                  <button
                    type="button"
                    onClick={() => onDeleteChecklist(checklist.id)}
                    className="mt-3 inline-flex h-10 items-center justify-center rounded-[14px] border border-stone-200 px-4 text-sm font-semibold text-stone-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
