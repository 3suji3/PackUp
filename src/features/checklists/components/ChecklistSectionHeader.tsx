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
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          준비 리스트
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">
          {checklist ? checklist.title : "아직 준비 리스트가 없어요"}
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-slate-500">
        {checklist
          ? "체크하면서 하나씩 챙겨요. 필요하면 직접 추가할 수 있어요."
          : "위에서 상황을 고르면 바로 생성돼요."}
      </p>
    </div>
  );
}
