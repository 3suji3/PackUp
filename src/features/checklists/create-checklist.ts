import { checklistTemplates } from "@/features/checklists/templates";
import type { Checklist, Scenario } from "@/types/checklist";

export function createChecklist(scenario: Scenario): Checklist {
  const template = checklistTemplates[scenario];

  if (!template) {
    throw new Error(`Unknown scenario: ${scenario}`);
  }

  const timestamp = Date.now();

  return {
    id: crypto.randomUUID(),
    title: template.title,
    scenario,
    items: template.items.map((item) => ({
      id: crypto.randomUUID(),
      name: item.name,
      checked: false,
    })),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
