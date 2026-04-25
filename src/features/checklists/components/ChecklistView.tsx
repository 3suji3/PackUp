"use client";

import { useState, type FormEvent } from "react";

import type { Checklist, Scenario } from "@/types/checklist";

const scenarioLabels: Record<Scenario, string> = {
  travel: "여행",
  school: "학교",
  gym: "운동",
};

interface ChecklistViewProps {
  checklist: Checklist | null;
  onToggleItem: (itemId: string) => void;
  onAddItem: (itemName: string) => void;
}

export function ChecklistView({
  checklist,
  onToggleItem,
  onAddItem,
}: ChecklistViewProps) {
  const [newItemName, setNewItemName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedItemName = newItemName.trim();

    if (!trimmedItemName) {
      return;
    }

    onAddItem(trimmedItemName);
    setNewItemName("");
  };

  if (!checklist) {
    return (
      <div className="mt-6 animate-packup-enter rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm leading-7 text-slate-500">
        <p className="font-semibold text-slate-700">아직 준비 리스트가 없어요</p>
        <p className="mt-2">
          상황을 고르면 바로 준비물을 만들어드릴게요. 필요한 물건은 직접 추가할 수도
          있어요.
        </p>
      </div>
    );
  }

  const checkedCount = checklist.items.filter((item) => item.checked).length;

  return (
    <div className="mt-6 grid animate-packup-enter gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-2xl bg-slate-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          준비 현황
        </p>
        <dl className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex items-center justify-between gap-4">
            <dt>상황</dt>
            <dd className="font-semibold text-slate-950">
              {scenarioLabels[checklist.scenario]}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt>챙긴 물건</dt>
            <dd className="font-semibold text-slate-950">
              {checkedCount}/{checklist.items.length}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt>최근 수정</dt>
            <dd className="font-semibold text-slate-950">
              {new Date(checklist.updatedAt).toLocaleTimeString("ko-KR")}
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            챙길 물건
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center"
          >
            <input
              type="text"
              value={newItemName}
              onChange={(event) => setNewItemName(event.target.value)}
              placeholder="필요한 물건을 직접 추가해보세요"
              className="h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition duration-150 hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              추가하기
            </button>
          </form>
        </div>
        <ul className="mt-4 grid gap-3">
          {checklist.items.map((item) => (
            <li key={item.id}>
              <label
                className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-4 text-sm text-slate-700 transition duration-200 ${
                  item.checked
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => onToggleItem(item.id)}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`block font-medium ${
                      item.checked ? "text-slate-500 line-through" : "text-slate-950"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`mt-1 block text-xs font-semibold uppercase tracking-[0.14em] ${
                      item.checked ? "text-blue-600" : "text-slate-400"
                    }`}
                  >
                    {item.checked ? "챙겼어요" : "아직이에요"}
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
