# checklist-generation.md

## 1. 문서 목적

이 문서는 PackUp MVP의 체크리스트 생성과 현재 화면 동작 방식을 정리한다.

---

## 2. MVP 범위

현재 지원 시나리오:
- `travel`
- `school`
- `gym`

현재 범위:
- 시나리오 선택
- 체크리스트 생성
- 체크 상태 변경
- 사용자 항목 추가

제외 범위:
- 조건 분기
- 자동 추천
- localStorage 저장
- 서버 연동

---

## 3. 생성 방식

1. 사용자가 메인 화면에서 시나리오를 선택한다.
2. `createChecklist(scenario)`가 템플릿을 읽는다.
3. 템플릿의 제목과 항목 이름을 기반으로 새 체크리스트를 만든다.
4. 체크리스트 `id`, 항목 `id`, `createdAt`, `updatedAt`을 새로 생성한다.
5. 모든 항목은 `checked: false`로 시작한다.
6. 생성 결과는 `currentChecklist`에 반영한다.

---

## 4. 사용자 항목 추가

체크리스트 화면에는 다음 UI를 둔다.

- 입력창 1개
- 추가 버튼 1개

동작 규칙:
- 입력값은 `ChecklistView`의 로컬 상태로 관리한다.
- 제출 시 `trim()` 결과가 비어 있으면 추가하지 않는다.
- 유효한 입력이면 `page.tsx`의 핸들러가 실제 항목 추가를 처리한다.
- 새 항목은 `currentChecklist.items`에 추가한다.
- 새 항목은 새 `id`와 `checked: false`를 가진다.
- 추가 직후 `updatedAt`을 갱신한다.

---

## 5. 화면 책임

- `page.tsx`
  - 상태와 핸들러 유지
- `ChecklistView`
  - 체크리스트 표시
  - empty state 문구 표시
  - 사용자 항목 입력 UI 표시

이 방식은 `page.tsx` 비대화를 막으면서도, 아직 Context나 localStorage 없이 구현 가능한 최소 구조다.
---

## 2026-04-22 update: save and restore

- `currentChecklist` is saved to `localStorage` under `packup.currentChecklist`.
- The app restores only the latest single checklist after refresh.
- Persisted changes are triggered by the same state updates used for scenario selection, item toggle, and item addition.
- Saved checklist list management is still out of scope for this step.
