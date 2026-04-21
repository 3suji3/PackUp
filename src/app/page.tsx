"use client";

import { useEffect, useState } from "react";

import { ChecklistView } from "@/features/checklists/components/ChecklistView";
import { SavedChecklistList } from "@/features/checklists/components/SavedChecklistList";
import { createChecklist } from "@/features/checklists/create-checklist";
import {
  loadCurrentChecklist,
  loadSavedChecklists,
  saveCurrentChecklist,
  saveSavedChecklists,
} from "@/features/checklists/storage";
import type { Checklist, Scenario } from "@/types/checklist";

interface ScenarioCard {
  title: string;
  description: string;
  tag: Scenario;
}

const scenarios: ScenarioCard[] = [
  {
    title: "여행",
    description: "이동 일정과 숙박 준비에 맞는 기본 준비물을 바로 시작해요.",
    tag: "travel",
  },
  {
    title: "등교",
    description: "등교 가기 전에 책가방과 기본 준비물을 빠르게 확인해요.",
    tag: "school",
  },
  {
    title: "운동",
    description: "운동 전후 루틴에 맞는 가방 체크리스트를 만들어요.",
    tag: "gym",
  },
];

export default function HomePage() {
  const [currentChecklist, setCurrentChecklist] = useState<Checklist | null>(null);
  const [savedChecklists, setSavedChecklists] = useState<Checklist[]>([]);
  const [hasRestoredChecklist, setHasRestoredChecklist] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setCurrentChecklist(loadCurrentChecklist());
      setSavedChecklists(loadSavedChecklists());
      setHasRestoredChecklist(true);
    });
  }, []);

  useEffect(() => {
    if (!hasRestoredChecklist) {
      return;
    }

    saveCurrentChecklist(currentChecklist);
  }, [currentChecklist, hasRestoredChecklist]);

  useEffect(() => {
    if (!hasRestoredChecklist) {
      return;
    }

    saveSavedChecklists(savedChecklists);
  }, [savedChecklists, hasRestoredChecklist]);

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentChecklist(createChecklist(scenario));
  };

  const handleToggleItem = (itemId: string) => {
    setCurrentChecklist((prevChecklist) => {
      if (!prevChecklist) {
        return prevChecklist;
      }

      return {
        ...prevChecklist,
        updatedAt: Date.now(),
        items: prevChecklist.items.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item,
        ),
      };
    });
  };

  const handleAddItem = (itemName: string) => {
    const trimmedItemName = itemName.trim();

    if (!trimmedItemName) {
      return;
    }

    setCurrentChecklist((prevChecklist) => {
      if (!prevChecklist) {
        return prevChecklist;
      }

      return {
        ...prevChecklist,
        updatedAt: Date.now(),
        items: [
          ...prevChecklist.items,
          {
            id: crypto.randomUUID(),
            name: trimmedItemName,
            checked: false,
          },
        ],
      };
    });
  };

  const handleSaveChecklist = () => {
    if (!currentChecklist) {
      return;
    }

    setSavedChecklists((prevChecklists) => {
      const nextChecklists = prevChecklists.filter(
        (checklist) => checklist.id !== currentChecklist.id,
      );

      return [currentChecklist, ...nextChecklists].sort(
        (left, right) => right.updatedAt - left.updatedAt,
      );
    });
  };

  const handleSelectSavedChecklist = (checklistId: string) => {
    const selectedChecklist =
      savedChecklists.find((checklist) => checklist.id === checklistId) ?? null;

    if (!selectedChecklist) {
      return;
    }

    setCurrentChecklist(selectedChecklist);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff6ec_0%,#fffaf5_48%,#f7efe5_100%)] px-6 py-10 text-stone-900">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center gap-8">
        <section className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(199,144,98,0.16)] backdrop-blur">
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            PackUp MVP
          </span>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <p className="font-[family-name:var(--font-display)] text-5xl leading-tight text-stone-900 md:text-6xl">
                상황만 고르면
                <br />
                준비가 가벼워집니다
              </p>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                PackUp은 상황에 맞는 준비물 체크리스트를 빠르게 시작할 수 있도록
                도와주는 앱입니다. 이번 단계에서는 첫 화면에서 상황을 선택하면
                생성된 체크리스트를 바로 확인하고, 필요한 체크리스트를 여러 개
                저장해 다시 불러올 수 있게 연결합니다.
              </p>
            </div>
            <div className="rounded-[28px] bg-[#fff2dd] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
                Current Flow
              </p>
              <p className="mt-3 text-2xl font-bold text-stone-900">
                상황 선택과 저장 목록 관리
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                카드를 누르면 `createChecklist`가 실행되고, 현재 체크리스트를
                바로 편집할 수 있습니다. 저장 버튼을 누른 체크리스트는 별도
                목록에 쌓이고, 다시 선택하면 현재 체크리스트로 불러옵니다.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.tag}
              type="button"
              onClick={() => handleScenarioSelect(scenario.tag)}
              className="rounded-[28px] border border-stone-200/70 bg-white/85 p-6 text-left shadow-[0_12px_40px_rgba(120,94,70,0.08)] transition-transform duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_18px_48px_rgba(199,144,98,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf5]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                {scenario.tag}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-stone-900">
                {scenario.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-stone-600">
                {scenario.description}
              </p>
            </button>
          ))}
        </section>

        <section className="rounded-[32px] border border-stone-200/70 bg-white/85 p-8 shadow-[0_16px_48px_rgba(120,94,70,0.08)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                Generated Checklist
              </p>
              <h2 className="mt-2 text-3xl font-bold text-stone-900">
                {currentChecklist
                  ? currentChecklist.title
                  : "아직 생성된 체크리스트가 없어요"}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-500">
              {currentChecklist
                ? "선택한 상황으로 만든 체크리스트입니다. 항목을 바로 체크하거나 직접 준비물을 추가할 수 있습니다."
                : "상황 카드를 누르면 템플릿 기반 체크리스트가 생성되고, 아래 영역에서 결과를 확인할 수 있습니다."}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSaveChecklist}
              disabled={!currentChecklist}
              className="inline-flex h-11 items-center justify-center rounded-[16px] bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-100"
            >
              현재 체크리스트 저장
            </button>
            <p className="flex items-center text-sm leading-6 text-stone-500">
              저장한 체크리스트는 아래 목록에서 다시 불러올 수 있습니다.
            </p>
          </div>

          <ChecklistView
            checklist={currentChecklist}
            onToggleItem={handleToggleItem}
            onAddItem={handleAddItem}
          />
        </section>

        <section className="rounded-[32px] border border-stone-200/70 bg-white/85 p-8 shadow-[0_16px_48px_rgba(120,94,70,0.08)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                Saved Checklists
              </p>
              <h2 className="mt-2 text-3xl font-bold text-stone-900">
                저장한 체크리스트 목록
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-500">
              여러 체크리스트를 기기 안에 저장해 두고, 필요한 순간 현재 체크리스트로 다시 불러옵니다.
            </p>
          </div>

          <div className="mt-6">
            <SavedChecklistList
              savedChecklists={savedChecklists}
              currentChecklistId={currentChecklist?.id ?? null}
              onSelectChecklist={handleSelectSavedChecklist}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
