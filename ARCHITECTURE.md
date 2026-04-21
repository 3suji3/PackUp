# ARCHITECTURE.md

## 1. 개요

PackUp은 상황 기반 준비물 자동 생성 앱이다.
사용자가 상황을 선택하면 해당 상황에 맞는 체크리스트를 만들고, 체크 상태를 관리하고, 여러 리스트를 저장해 재사용하는 것을 MVP 목표로 둔다.

현재 구조는 서버 없이 동작하는 client-first MVP 아키텍처를 전제로 한다.

---

## 2. 시스템 구조

현재 MVP 구조:
- Next.js 기반 프론트엔드
- 브라우저 메모리 상태 관리
- localStorage 기반 저장
- 서버/API 미사용

이 선택의 이유:
- MVP 범위에서 가장 단순하게 동작 흐름을 검증할 수 있다.
- 체크리스트 생성, 수정, 저장을 모두 프론트엔드 안에서 설명 가능하게 유지할 수 있다.

---

## 3. 데이터 구조

체크리스트 도메인 타입은 `src/types/checklist.ts`에서 관리한다.

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

설계 원칙:
- `Scenario`는 문자열 유니온으로 고정해 MVP 시나리오를 명확하게 제한한다.
- `ChecklistItem`은 UI 체크 상태와 저장 구조를 같은 형태로 유지한다.
- `Checklist`는 여러 리스트 저장을 전제로 `id`, `title`, `createdAt`, `updatedAt`을 포함한다.

---

## 4. 템플릿 구조

시나리오별 기본 준비물 템플릿은 `src/features/checklists/templates.ts`에서 관리한다.

구조:
- `Record<Scenario, { title: string; items: ChecklistItem[] }>`

이유:
- 시나리오 선택 후 바로 체크리스트 생성 로직으로 연결하기 쉽다.
- 템플릿 데이터와 실제 렌더링 데이터의 형태 차이를 최소화할 수 있다.

현재 기본 시나리오:
- travel
- school
- gym

---

## 5. 상태 관리 구조

현재 기준:
- 전역 공유가 필요한 체크리스트 목록은 Context API
- 화면 내부 상호작용은 `useState`
- 홈 화면의 초기 생성 흐름은 페이지 로컬 상태로 먼저 연결

이유:
- MVP에서는 복잡한 상태 라이브러리 없이도 설명 가능한 구조를 유지할 수 있다.
- 저장 기능 전 단계에서는 가장 작은 상태 범위로 흐름을 검증하는 편이 안전하다.

---

## 6. 데이터 흐름

기본 흐름:
1. 사용자가 홈 화면에서 시나리오를 선택한다.
2. 홈 화면이 `createChecklist(scenario)`를 호출한다.
3. 선택한 `Scenario`로 템플릿 데이터를 찾는다.
4. 템플릿의 `title`, `items`를 기반으로 새로운 `Checklist`를 만든다.
5. 이때 체크리스트 `id`, 각 아이템 `id`, `createdAt`, `updatedAt`은 새로 생성한다.
6. 생성된 모든 아이템은 `checked: false`로 시작한다.
7. 생성된 체크리스트를 우선 페이지 로컬 상태에 연결해 다음 화면 구현 전까지 임시로 사용한다.
8. 이후 단계에서 아이템 체크 상태를 수정하거나 항목을 추가한다.
9. 저장 기능 단계에서만 localStorage에 반영한다.

---

## 7. 확장 기준

현재 문서 기준에서 허용하는 확장 방향:
- 조건 기반 아이템 추가 로직
- 저장된 체크리스트 목록/재사용
- 서버 저장으로 전환 가능한 저장 계층 분리

현재 금지하는 방향:
- 로그인 기능
- 서버/API 연동
- 자동 추천 등 MVP 밖 기능
