"use client";

import { useState, type FormEvent } from "react";

import type { Checklist } from "@/types/checklist";

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
      <div className="mt-6 rounded-[24px] border border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-center text-sm leading-7 text-stone-500">
        상황을 선택하면 체크리스트가 생성돼요. 위 카드 중 하나를 눌러서 바로 시작해보세요.
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
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
            Checklist Items
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-[20px] border border-stone-200 bg-white p-4 md:flex-row md:items-center"
          >
            <input
              type="text"
              value={newItemName}
              onChange={(event) => setNewItemName(event.target.value)}
              placeholder="직접 챙길 준비물을 추가해보세요"
              className="h-12 flex-1 rounded-[16px] border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-orange-300 focus:bg-white"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-[16px] bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              항목 추가
            </button>
          </form>
        </div>
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
