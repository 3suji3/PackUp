# ARCHITECTURE.md

## 1. 개요

PackUp은 상황 기반 준비물 체크리스트를 빠르게 생성하고 확인하는 클라이언트 중심 MVP다.

현재 단계 목표:
- 시나리오를 선택한다.
- 체크리스트를 생성한다.
- 항목 체크 상태를 바꾼다.
- 사용자 항목을 직접 추가한다.

로그인, 서버 저장, 추천 기능은 아직 포함하지 않는다.

---

## 2. 현재 아키텍처

- Framework: Next.js App Router
- Rendering: Client Component 중심
- State: 페이지 로컬 상태 `useState`
- Storage: 아직 미연결

선택 이유:
- MVP 범위에서 가장 단순하게 상태 흐름을 설명할 수 있다.
- 이후 localStorage 또는 Context로 확장할 때도 현재 데이터 구조를 유지하기 쉽다.

---

## 3. 데이터 구조

체크리스트 타입은 `src/types/checklist.ts`에서 관리한다.

```ts
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
```

원칙:
- 체크리스트와 항목 모두 안정적인 `id`를 가진다.
- UI 상태와 저장 대상 구조를 같은 형태로 유지한다.
- `updatedAt`은 체크 토글과 사용자 항목 추가 시점마다 갱신한다.

---

## 4. 체크리스트 생성 흐름

1. 사용자가 시나리오를 선택한다.
2. `createChecklist(scenario)`가 템플릿을 읽는다.
3. 새 체크리스트 인스턴스를 만든다.
4. 각 항목에 새 `id`를 부여하고 `checked: false`로 초기화한다.
5. 생성된 체크리스트를 `currentChecklist`에 저장한다.

---

## 5. 체크리스트 화면 책임 분리

- `page.tsx`
  - `currentChecklist` 상태 소유
  - `handleScenarioSelect`
  - `handleToggleItem`
  - `handleAddItem`
- `ChecklistView`
  - 체크리스트 요약 표시
  - 체크리스트 항목 목록 표시
  - 사용자 항목 입력 UI 표시

이 구조는 화면 표시 책임을 feature 경로에 두고, 실제 데이터 변경은 페이지 상태에서 처리하는 현재 MVP 기준의 최소 분리다.

---

## 6. 다음 단계 확장 포인트

- localStorage 저장/불러오기
- 여러 체크리스트 목록 관리
- Context API 도입 여부 검토

현재는 확장을 위해 구조만 열어 두고, 구현은 페이지 로컬 상태에 머문다.
---

## 2026-04-22 update: checklist persistence expansion

- Storage is split into two keys:
  - `packup.currentChecklist`: latest working checklist
  - `packup.savedChecklists`: reusable saved checklist array
- Restore timing: both values are restored once after the client page mounts.
- Save timing:
  - `currentChecklist` is saved whenever the current working checklist changes.
  - `savedChecklists` is saved whenever the saved checklist array changes.
- Ownership stays in `src/app/page.tsx`; persistence I/O remains in `src/features/checklists/storage.ts`.
- Saving to the reusable list uses checklist `id` as the stable key, so re-saving the same checklist updates the existing entry instead of duplicating it.
