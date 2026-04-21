import type { Checklist, Scenario } from "@/types/checklist";

const CURRENT_CHECKLIST_STORAGE_KEY = "packup.currentChecklist";
const SAVED_CHECKLISTS_STORAGE_KEY = "packup.savedChecklists";

const validScenarios: Scenario[] = ["travel", "school", "gym"];

function isChecklistItem(value: unknown): value is Checklist["items"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<Checklist["items"][number]>;

  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.checked === "boolean"
  );
}

function isChecklist(value: unknown): value is Checklist {
  if (!value || typeof value !== "object") {
    return false;
  }

  const checklist = value as Partial<Checklist>;

  return (
    typeof checklist.id === "string" &&
    typeof checklist.title === "string" &&
    typeof checklist.scenario === "string" &&
    validScenarios.includes(checklist.scenario as Scenario) &&
    typeof checklist.createdAt === "number" &&
    typeof checklist.updatedAt === "number" &&
    Array.isArray(checklist.items) &&
    checklist.items.every(isChecklistItem)
  );
}

export function loadCurrentChecklist(): Checklist | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(CURRENT_CHECKLIST_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    return isChecklist(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export function saveCurrentChecklist(checklist: Checklist | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!checklist) {
    window.localStorage.removeItem(CURRENT_CHECKLIST_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    CURRENT_CHECKLIST_STORAGE_KEY,
    JSON.stringify(checklist),
  );
}

export function loadSavedChecklists(): Checklist[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedValue = window.localStorage.getItem(SAVED_CHECKLISTS_STORAGE_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isChecklist);
  } catch {
    return [];
  }
}

export function saveSavedChecklists(checklists: Checklist[]) {
  if (typeof window === "undefined") {
    return;
  }

  if (checklists.length === 0) {
    window.localStorage.removeItem(SAVED_CHECKLISTS_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    SAVED_CHECKLISTS_STORAGE_KEY,
    JSON.stringify(checklists),
  );
}
