# 목적

구현 과정에서 내린 구조 결정을 간단히 기록한다.

---

## 기록 방식

- 날짜
- 문제 상황
- 선택지
- 선택 이유
- trade-off

---

## 2026-04-22

### 체크리스트 화면 분리

- 문제 상황: 체크리스트 표시 UI와 상태 변경 로직이 `src/app/page.tsx`에 계속 쌓이면 페이지가 빠르게 비대해질 수 있다.
- 선택지: `page.tsx`에 계속 유지 / 화면 표시를 feature 컴포넌트로 분리
- 선택 이유: `ChecklistView`를 `src/features/checklists/components/ChecklistView.tsx`에 두면 체크리스트 화면 책임을 feature 단위로 유지할 수 있다.
- trade-off: 아직 단일 페이지 상태 구조이므로 props 전달은 늘어난다.

### 사용자 항목 추가 책임

- 문제 상황: 사용자 항목 추가 UI와 실제 체크리스트 데이터 변경 책임을 어디에 둘지 정해야 했다.
- 선택지: 모두 `page.tsx`에서 처리 / 입력 UI는 `ChecklistView`, 실제 상태 변경은 `page.tsx`
- 선택 이유: 화면은 feature 컴포넌트에 두고, `currentChecklist.items` 변경과 `updatedAt` 갱신은 페이지 상태에서 처리하면 MVP에서 가장 단순하게 설명 가능하다.
- trade-off: 입력창 값은 컴포넌트 로컬 상태라서, 이후 여러 화면 공유가 필요하면 상태 위치를 다시 검토해야 한다.
