"use client";

import { useEffect, useState } from "react";

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

  const handleDeleteSavedChecklist = (checklistId: string) => {
    setSavedChecklists((prevChecklists) =>
      prevChecklists.filter((checklist) => checklist.id !== checklistId),
    );

    setCurrentChecklist((prevChecklist) => {
      if (!prevChecklist || prevChecklist.id !== checklistId) {
        return prevChecklist;
      }

      return null;
    });
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
                Pick a scenario
                <br />
                and start packing faster
              </p>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                PackUp helps you create a situation-based checklist quickly, check items off,
                and keep reusable lists saved on the same device for later.
              </p>
            </div>
            <div className="rounded-[28px] bg-[#fff2dd] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
                Current Flow
              </p>
              <p className="mt-3 text-2xl font-bold text-stone-900">
                Scenario selection and saved list management
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Choosing a card creates a working checklist. Saving keeps a reusable copy in
                the saved list, and selecting that entry loads it back into the main checklist
                area.
              </p>
            </div>
          </div>
        </section>

        <ScenarioSelector onSelectScenario={handleScenarioSelect} />

        <section className="rounded-[32px] border border-stone-200/70 bg-white/85 p-8 shadow-[0_16px_48px_rgba(120,94,70,0.08)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                Generated Checklist
              </p>
              <h2 className="mt-2 text-3xl font-bold text-stone-900">
                {currentChecklist ? currentChecklist.title : "No checklist selected yet"}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-500">
              {currentChecklist
                ? "This is the current working checklist. You can toggle items and add your own entries here."
                : "Choose a scenario card to create a checklist and review it in this section."}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSaveChecklist}
              disabled={!currentChecklist}
              className="inline-flex h-11 items-center justify-center rounded-[16px] bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-100"
            >
              Save current checklist
            </button>
            <p className="flex items-center text-sm leading-6 text-stone-500">
              Saved checklists can be loaded again from the list below.
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
                Reusable checklist list
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-500">
              Keep multiple checklists on this device, reopen one as the working checklist, or
              remove entries you no longer need.
            </p>
          </div>

          <div className="mt-6">
            <SavedChecklistList
              savedChecklists={savedChecklists}
              currentChecklistId={currentChecklist?.id ?? null}
              onSelectChecklist={handleSelectSavedChecklist}
              onDeleteChecklist={handleDeleteSavedChecklist}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
