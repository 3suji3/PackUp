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
        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          {checklist ? checklist.title : "아직 준비 리스트가 없어요"}
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-slate-500">
        {checklist
          ? "체크하면서 하나씩 챙겨봐요. 필요한 물건을 직접 추가하고, 다음에도 쓰고 싶으면 저장해둘 수 있어요."
          : "준비할 상황을 고르면 바로 필요한 물건을 만들어드릴게요."}
      </p>
    </div>
  );
}
