# checklist-generation.md

## 1. 문서 목적

이 문서는 PackUp MVP의 체크리스트 생성 기준을 정리한다.
현재 단계에서는 시나리오 선택 후 기본 템플릿 데이터를 불러와 체크리스트를 만드는 구조만 다룬다.

---

## 2. MVP 범위

현재 지원하는 시나리오:
- `travel`
- `school`
- `gym`

현재 문서 범위:
- 시나리오 타입 정의
- 체크리스트 아이템 구조 정의
- 체크리스트 구조 정의
- 시나리오별 기본 템플릿 데이터 정의

---

## 3. 생성 방식

체크리스트 생성 흐름:
1. 사용자가 시나리오를 선택한다.
2. 선택된 시나리오와 일치하는 템플릿을 찾는다.
3. `createChecklist(scenario)`가 템플릿의 제목과 아이템 목록으로 새 체크리스트를 만든다.
4. 템플릿의 아이템 이름만 재사용하고, 체크리스트 `id`와 각 아이템 `id`는 새로 생성한다.
5. 모든 생성 아이템은 `checked: false`로 초기화한다.
6. `createdAt`, `updatedAt`은 생성 시점의 값으로 함께 기록한다.
7. 생성된 체크리스트는 이후 체크 상태 변경, 사용자 항목 추가, 저장 기능에서 공통으로 사용된다.

현재 MVP에서는 조건 분기나 추천 로직을 포함하지 않는다.

---

## 4. 타입 정의

기준 파일: `src/types/checklist.ts`

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

설명:
- `Scenario`는 지원 가능한 상황 범위를 제한한다.
- `ChecklistItem`은 UI와 저장 구조에서 공통으로 사용된다.
- `Checklist`는 여러 리스트 저장을 고려한 최소 필드를 가진다.

---

## 5. 템플릿 데이터

기준 파일: `src/features/checklists/templates.ts`

구조:

```ts
Record<Scenario, {
  title: string;
  items: ChecklistItem[];
}>
```

### travel

- 지갑
- 휴대폰 충전기
- 갈아입을 옷
- 세면도구
- 신분증

### school

- 가방
- 노트
- 필통
- 교과서
- 학생증

### gym

- 운동복
- 운동화
- 물통
- 수건
- 락커용 자물쇠

모든 기본 아이템의 `checked` 값은 `false`로 시작한다.

---

## 6. 설계 원칙

- 템플릿은 시나리오별 기본값만 가진다.
- 실제 체크리스트와 최대한 같은 구조를 사용해 변환 비용을 줄인다.
- MVP 단계에서는 불필요한 메타데이터를 추가하지 않는다.
- 템플릿의 `id`는 실제 체크리스트 인스턴스에서 재사용하지 않는다.

---

## 7. 예외 상황

### 템플릿이 없는 시나리오

- 생성 로직에서 체크리스트를 만들지 않는다.
- 이후 UI 단계에서 사용자에게 안내 메시지를 보여줄 수 있다.

### 템플릿 아이템 수정 필요

- 템플릿 데이터는 기본값이므로, 생성 이후의 수정은 실제 체크리스트 인스턴스에서 처리한다.

---

## 8. 다음 단계 연결

이 문서의 구조는 다음 기능 구현의 기준이 된다.

- 체크리스트 생성 함수
- 체크 상태 토글
- 사용자 항목 추가
- localStorage 저장 및 불러오기
