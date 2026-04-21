"use client";

import type { Checklist } from "@/types/checklist";

interface ChecklistViewProps {
  checklist: Checklist | null;
  onToggleItem: (itemId: string) => void;
}

export function ChecklistView({
  checklist,
  onToggleItem,
}: ChecklistViewProps) {
  if (!checklist) {
    return (
      <div className="mt-6 rounded-[24px] border border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-center text-sm leading-7 text-stone-500">
        아직 선택된 상황이 없습니다. 위 카드 중 하나를 눌러 체크리스트 생성
        흐름을 시작해 보세요.
      </div>
    );
  }

  const checkedCount = checklist.items.filter((item) => item.checked).length;

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[24px] bg-stone-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
          Summary
        </p>
        <dl className="mt-4 space-y-3 text-sm text-stone-600">
          <div className="flex items-center justify-between gap-4">
            <dt>scenario</dt>
            <dd className="font-semibold text-stone-900">{checklist.scenario}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt>items</dt>
            <dd className="font-semibold text-stone-900">
              {checkedCount}/{checklist.items.length}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt>updatedAt</dt>
            <dd className="font-semibold text-stone-900">
              {new Date(checklist.updatedAt).toLocaleTimeString("ko-KR")}
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
          Checklist Items
        </p>
        <ul className="mt-4 grid gap-3">
          {checklist.items.map((item) => (
            <li key={item.id}>
              <label className="flex cursor-pointer items-center gap-4 rounded-[20px] border border-stone-200 bg-stone-50 px-4 py-4 text-sm text-stone-700 transition-colors hover:border-orange-300 hover:bg-orange-50/60">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => onToggleItem(item.id)}
                  className="h-5 w-5 rounded border-stone-300 text-orange-500 focus:ring-orange-400"
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`block font-medium text-stone-900 ${
                      item.checked ? "line-through opacity-60" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-stone-400">
                    {item.checked ? "checked" : "unchecked"}
                  </span>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
