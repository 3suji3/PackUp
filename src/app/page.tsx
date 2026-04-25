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
    showStatusMessage("New checklist created. Review it and save it if you want to reuse it.");
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

    showStatusMessage(`Added "${trimmedItemName}" to the current checklist.`);
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

    showStatusMessage(`Saved "${currentChecklist.title}" to your checklist list.`);
  };

  const handleLoadSavedChecklist = (checklistId: string) => {
    const selectedChecklist =
      savedChecklists.find((checklist) => checklist.id === checklistId) ?? null;

    if (!selectedChecklist) {
      return;
    }

    setCurrentChecklist(selectedChecklist);
    showStatusMessage(`Loaded "${selectedChecklist.title}" as the current checklist.`);
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
      showStatusMessage(`Deleted "${deletedChecklist.title}" from your saved checklists.`);
    }
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
              onSelectChecklist={handleLoadSavedChecklist}
              onDeleteChecklist={handleDeleteSavedChecklist}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
