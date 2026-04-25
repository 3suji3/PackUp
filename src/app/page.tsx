"use client";

import { useEffect, useState } from "react";

import { ChecklistActionBar } from "@/features/checklists/components/ChecklistActionBar";
import { ChecklistSectionHeader } from "@/features/checklists/components/ChecklistSectionHeader";
import { ChecklistView } from "@/features/checklists/components/ChecklistView";
import { SavedChecklistList } from "@/features/checklists/components/SavedChecklistList";
import { ScenarioSelector } from "@/features/checklists/components/ScenarioSelector";
import { createChecklist } from "@/features/checklists/create-checklist";
import {
  loadCurrentChecklist,
  loadSavedChecklists,
  saveCurrentChecklist,
  saveSavedChecklists,
} from "@/features/checklists/storage";
import type { Checklist, Scenario } from "@/types/checklist";

const FEEDBACK_RESET_DELAY_MS = 2800;

export default function HomePage() {
  const [currentChecklist, setCurrentChecklist] = useState<Checklist | null>(null);
  const [savedChecklists, setSavedChecklists] = useState<Checklist[]>([]);
  const [hasRestoredChecklist, setHasRestoredChecklist] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

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

  useEffect(() => {
    if (!statusMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatusMessage(null);
    }, FEEDBACK_RESET_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [statusMessage]);

  const showStatusMessage = (message: string) => {
    setStatusMessage(message);
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentChecklist(createChecklist(scenario));
    showStatusMessage("준비 리스트를 만들었어요. 하나씩 챙겨볼까요?");
  };

  const handleToggleChecklistItem = (itemId: string) => {
    setCurrentChecklist((previousChecklist) => {
      if (!previousChecklist) {
        return previousChecklist;
      }

      return {
        ...previousChecklist,
        updatedAt: Date.now(),
        items: previousChecklist.items.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item,
        ),
      };
    });
  };

  const handleAddChecklistItem = (itemName: string) => {
    const trimmedItemName = itemName.trim();

    if (!trimmedItemName) {
      return;
    }

    setCurrentChecklist((previousChecklist) => {
      if (!previousChecklist) {
        return previousChecklist;
      }

      return {
        ...previousChecklist,
        updatedAt: Date.now(),
        items: [
          ...previousChecklist.items,
          {
            id: crypto.randomUUID(),
            name: trimmedItemName,
            checked: false,
          },
        ],
      };
    });

    showStatusMessage(`"${trimmedItemName}"을 리스트에 추가했어요.`);
  };

  const handleSaveCurrentChecklist = () => {
    if (!currentChecklist) {
      return;
    }

    setSavedChecklists((previousChecklists) => {
      const remainingChecklists = previousChecklists.filter(
        (checklist) => checklist.id !== currentChecklist.id,
      );

      return [currentChecklist, ...remainingChecklists].sort(
        (leftChecklist, rightChecklist) => rightChecklist.updatedAt - leftChecklist.updatedAt,
      );
    });

    showStatusMessage(`"${currentChecklist.title}"을 저장해뒀어요.`);
  };

  const handleLoadSavedChecklist = (checklistId: string) => {
    const selectedChecklist =
      savedChecklists.find((checklist) => checklist.id === checklistId) ?? null;

    if (!selectedChecklist) {
      return;
    }

    setCurrentChecklist(selectedChecklist);
    showStatusMessage(`"${selectedChecklist.title}"을 다시 불러왔어요.`);
  };

  const handleDeleteSavedChecklist = (checklistId: string) => {
    const deletedChecklist =
      savedChecklists.find((checklist) => checklist.id === checklistId) ?? null;

    setSavedChecklists((previousChecklists) =>
      previousChecklists.filter((checklist) => checklist.id !== checklistId),
    );

    setCurrentChecklist((previousChecklist) => {
      if (!previousChecklist || previousChecklist.id !== checklistId) {
        return previousChecklist;
      }

      return null;
    });

    if (deletedChecklist) {
      showStatusMessage(`"${deletedChecklist.title}"을 저장 목록에서 지웠어요.`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 md:px-6 md:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center gap-6">
        <section className="animate-packup-enter rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:p-8">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            PackUp 준비 도우미
          </span>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <p className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
                어떤 준비를
                <br />
                할까요?
              </p>
              <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                상황을 고르면 필요한 준비물을 바로 만들어드릴게요. 체크하면서 하나씩
                챙기고, 자주 쓰는 리스트는 저장해두세요.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 md:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                지금 할 수 있는 일
              </p>
              <p className="mt-3 text-2xl font-bold text-slate-950">
                고르고, 체크하고, 다시 쓰기
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                준비 상황을 고르면 새 리스트가 만들어져요. 저장해두면 다음에도 같은
                준비를 빠르게 시작할 수 있어요.
              </p>
            </div>
          </div>
        </section>

        <ScenarioSelector onSelectScenario={handleScenarioSelect} />

        <section className="animate-packup-enter rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_44px_rgba(15,23,42,0.05)] md:p-8">
          <ChecklistSectionHeader checklist={currentChecklist} />

          <ChecklistActionBar
            canSave={Boolean(currentChecklist)}
            feedbackMessage={statusMessage}
            onSave={handleSaveCurrentChecklist}
          />

          <ChecklistView
            checklist={currentChecklist}
            onToggleItem={handleToggleChecklistItem}
            onAddItem={handleAddChecklistItem}
          />
        </section>

        <section className="animate-packup-enter rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_44px_rgba(15,23,42,0.05)] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                저장한 리스트
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                저장한 준비 리스트
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              자주 쓰는 준비 리스트를 이 기기에 저장해둘 수 있어요. 필요할 때 다시
              불러오고, 안 쓰는 리스트는 정리해요.
            </p>
          </div>

          <div className="mt-6">
            <SavedChecklistList
              savedChecklists={savedChecklists}
              currentChecklistId={currentChecklist?.id ?? null}
              onSelectChecklist={handleLoadSavedChecklist}
              onDeleteChecklist={handleDeleteSavedChecklist}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
