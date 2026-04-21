import type { Checklist } from "@/types/checklist";

interface SavedChecklistListProps {
  savedChecklists: Checklist[];
  currentChecklistId: string | null;
  onSelectChecklist: (checklistId: string) => void;
}

export function SavedChecklistList({
  savedChecklists,
  currentChecklistId,
  onSelectChecklist,
}: SavedChecklistListProps) {
  if (savedChecklists.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-center text-sm leading-7 text-stone-500">
        저장된 체크리스트가 아직 없어요. 현재 체크리스트를 저장하면 여기에서 다시 불러올 수 있습니다.
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
            <button
              type="button"
              onClick={() => onSelectChecklist(checklist.id)}
              className={`w-full rounded-[24px] border px-5 py-4 text-left transition ${
                isActive
                  ? "border-orange-300 bg-orange-50/80 shadow-[0_12px_30px_rgba(199,144,98,0.14)]"
                  : "border-stone-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
              }`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                    {checklist.scenario}
                  </p>
                  <h3 className="mt-2 truncate text-lg font-bold text-stone-900">
                    {checklist.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {checkedCount}/{checklist.items.length} items checked
                  </p>
                </div>
                <div className="shrink-0 text-sm text-stone-500">
                  <p className="font-semibold text-stone-700">
                    {new Date(checklist.updatedAt).toLocaleString("ko-KR")}
                  </p>
                  <p className="mt-1">
                    {isActive ? "현재 보고 있는 체크리스트" : "저장된 체크리스트"}
                  </p>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
