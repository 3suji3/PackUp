import type { ChecklistItem, Scenario } from "@/types/checklist";

interface ChecklistTemplate {
  title: string;
  items: ChecklistItem[];
}

export const checklistTemplates: Record<Scenario, ChecklistTemplate> = {
  travel: {
    title: "여행 준비 리스트",
    items: [
      { id: "travel-wallet", name: "지갑", checked: false },
      { id: "travel-phone-charger", name: "휴대폰 충전기", checked: false },
      { id: "travel-clothes", name: "갈아입을 옷", checked: false },
      { id: "travel-toiletries", name: "세면도구", checked: false },
      { id: "travel-documents", name: "신분증", checked: false },
    ],
  },
  school: {
    title: "학교 준비 리스트",
    items: [
      { id: "school-backpack", name: "가방", checked: false },
      { id: "school-notebook", name: "노트", checked: false },
      { id: "school-pencil-case", name: "필통", checked: false },
      { id: "school-textbook", name: "교과서", checked: false },
      { id: "school-id-card", name: "학생증", checked: false },
    ],
  },
  gym: {
    title: "운동 준비 리스트",
    items: [
      { id: "gym-clothes", name: "운동복", checked: false },
      { id: "gym-shoes", name: "운동화", checked: false },
      { id: "gym-water-bottle", name: "물통", checked: false },
      { id: "gym-towel", name: "수건", checked: false },
      { id: "gym-locker-key", name: "락커 열쇠", checked: false },
    ],
  },
};
