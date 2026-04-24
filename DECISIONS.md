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

- 문제 상황: 체크리스트 표시 UI와 상태 변경 로직이 `src/app/page.tsx`에 계속 모이면 페이지가 빠르게 비대해질 수 있다.
- 선택지: `page.tsx`에 계속 유지 / 체크리스트 표시 UI를 feature 컴포넌트로 분리
- 선택 이유: `ChecklistView`를 `src/features/checklists/components/ChecklistView.tsx`로 두면 체크리스트 화면 책임을 feature 단위로 모을 수 있다.
- trade-off: 단일 페이지 상태 구조이므로 props 전달은 계속 필요하다.

### 사용자 항목 추가 책임

- 문제 상황: 사용자 항목 추가 UI와 실제 체크리스트 데이터 변경 책임을 어디에 둘지 먼저 정해야 했다.
- 선택지: 모두 `page.tsx`에서 처리 / 입력 UI는 `ChecklistView`, 실제 상태 변경은 `page.tsx`
- 선택 이유: 화면은 feature 컴포넌트로 두고, `currentChecklist.items` 변경과 `updatedAt` 갱신은 페이지 상태에서 처리하면 MVP 범위에서 가장 단순하다.
- trade-off: 입력값은 컴포넌트 로컬 상태로 관리하므로 이후 여러 화면 공유가 필요하면 위치를 다시 검토해야 한다.

### currentChecklist localStorage persistence

- 문제 상황: 새로고침 이후 마지막 체크리스트를 복원해야 하지만, 당시 단계에서 여러 체크리스트 목록까지 한 번에 넣으면 MVP 범위가 커진다.
- 선택지: 마지막 `currentChecklist` 1개만 저장 / 저장된 체크리스트 목록 전체를 먼저 설계
- 선택 이유: 당시 화면 구조와 상태 소유권이 `page.tsx`의 단일 `currentChecklist`에 맞춰져 있어 최소 변경으로 구현하기 쉬웠다.
- trade-off: 여러 체크리스트 저장/재사용 기능으로 확장할 때는 별도 컬렉션 구조가 추가로 필요하다.

### 저장 구조 확장: currentChecklist + savedChecklists 분리

- 문제 상황: 마지막 작업 중이던 체크리스트 복원은 계속 필요하고, 동시에 여러 체크리스트를 저장하고 다시 불러오는 MVP 요구도 충족해야 한다.
- 선택지: 하나의 키에 현재 체크리스트와 저장 목록을 함께 저장 / `currentChecklist`와 `savedChecklists`를 별도 키로 분리
- 선택 이유: 기존 복원 흐름을 깨지 않으면서 저장 목록 기능을 붙이려면 책임이 다른 두 데이터를 나누는 편이 안전하다.
- trade-off: `page.tsx` 상태가 하나 늘어나지만 저장 버튼과 목록 선택 흐름이 명확해지고, 이후 서버 저장 구조로도 옮기기 쉽다.
## 2026-04-25

### Saved checklist delete handling

- 문제 상황: 저장 목록 삭제는 `savedChecklists`뿐 아니라 현재 화면에 표시 중인 `currentChecklist`와 localStorage 반영까지 함께 맞춰야 한다.
- 선택지: 삭제 로직을 목록 컴포넌트 내부에 둔다 / `page.tsx`가 삭제를 처리하고 목록은 이벤트만 전달한다
- 선택 이유: 삭제가 여러 페이지 상태에 동시에 영향을 주므로 `page.tsx`에서 처리해야 기존 save effect를 그대로 활용하면서 상태 흐름을 설명하기 쉽다.
- trade-off: 프레젠테이션 컴포넌트가 삭제 이벤트 prop을 하나 더 받는다.

### Minimal scenario UI split

- 문제 상황: `page.tsx`가 길어지고 있지만 지금 단계에서 대규모 화면 분리는 범위를 키울 수 있다.
- 선택지: 여러 섹션을 한 번에 분리한다 / 반복되는 상황 선택 카드만 우선 분리한다
- 선택 이유: `ScenarioSelector`만 분리하면 읽기 부담을 줄이면서도 상태 소유와 생성 로직은 기존 구조를 유지할 수 있다.
- trade-off: 페이지가 여전히 상태 오케스트레이션을 담당하므로 완전한 화면 분리는 이후 필요 시 다시 검토해야 한다.
