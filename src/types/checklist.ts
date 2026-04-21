export type Scenario = "travel" | "school" | "gym";

export interface ChecklistItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  scenario: Scenario;
  items: ChecklistItem[];
  createdAt: number;
  updatedAt: number;
}
