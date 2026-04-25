import type { Checklist, Scenario } from "@/types/checklist";

const scenarioLabels: Record<Scenario, string> = {
  travel: "여행",
  school: "학교",
  gym: "운동",
};

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
      <div className="animate-packup-enter rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm leading-7 text-slate-500">
        <p className="font-semibold text-slate-700">아직 저장한 리스트가 없어요</p>
        <p className="mt-2">
          준비 리스트를 저장하면 여기에 모아둘게요. 다음에 같은 준비를 할 때 바로
          불러올 수 있어요.
        </p>
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
              className={`animate-packup-enter rounded-3xl border px-5 py-4 transition duration-200 ${
                isActive
                  ? "border-blue-200 bg-blue-50 shadow-[0_12px_30px_rgba(37,99,235,0.10)]"
                  : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"
              }`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {scenarioLabels[checklist.scenario]}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectChecklist(checklist.id)}
                    className="mt-2 block w-full rounded-xl text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.99]"
                  >
                    <h3 className="truncate text-lg font-bold text-slate-950">
                      {checklist.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {checklist.items.length}개 중 {checkedCount}개 챙겼어요
                    </p>
                  </button>
                </div>
                <div className="shrink-0 text-sm text-slate-500 md:text-right">
                  <p className="font-semibold text-slate-700">
                    {new Date(checklist.updatedAt).toLocaleString("ko-KR")}
                  </p>
                  <p className="mt-1">
                    {isActive ? "지금 보고 있는 리스트" : "저장한 리스트"}
                  </p>
                  <button
                    type="button"
                    onClick={() => onDeleteChecklist(checklist.id)}
                    className="mt-3 inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition duration-150 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
                  >
                    삭제
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
