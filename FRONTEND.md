# FRONTEND.md

## 1. 목적

이 문서는 PackUp 프론트엔드 구현 규칙을 정리한다.

목표:
- 코드 구조를 일관되게 유지한다.
- MVP 범위 안에서 빠르게 구현한다.
- 다음 단계 기능이 자연스럽게 이어지도록 한다.

---

## 2. 폴더 구조

```text
src/
├─ app/
├─ components/
├─ features/
├─ hooks/
├─ store/
├─ types/
└─ utils/
```

규칙:
- 공통 도메인 타입은 `src/types`에 둔다.
- 기능별 데이터와 로직은 `src/features/<feature-name>` 아래에 둔다.
- UI 컴포넌트는 `src/components` 또는 기능 하위 컴포넌트로 분리한다.

---

## 3. 체크리스트 도메인 구조

체크리스트 시스템의 기본 타입은 `src/types/checklist.ts`에서 관리한다.

포함 범위:
- `Scenario`
- `ChecklistItem`
- `Checklist`

이유:
- 화면, 상태, 저장 구조가 같은 타입을 공유해야 하기 때문이다.
- localStorage 저장 구조와 UI 렌더링 구조를 일치시키기 쉽다.

---

## 4. 템플릿 데이터 배치

시나리오별 기본 체크리스트 템플릿은 `src/features/checklists/templates.ts`에 둔다.

규칙:
- MVP 시나리오만 포함한다.
- 템플릿 데이터는 생성 로직에서 바로 사용할 수 있는 형태를 유지한다.
- 템플릿 아이템도 `ChecklistItem` 구조를 따른다.

현재 범위:
- `travel`
- `school`
- `gym`

---

## 5. 상태 관리

- 전역 상태는 Context API를 우선한다.
- 화면 내부 상태는 `useState`를 사용한다.
- 저장 구조와 상태 구조가 다르게 분리되지 않도록 주의한다.
- 단일 화면에서 다음 단계로 넘기기 위한 임시 연결은 페이지 로컬 상태로 먼저 구현할 수 있다.

---

## 6. 네이밍 규칙

- 컴포넌트: PascalCase
- 변수와 함수: camelCase
- 파일명: kebab-case
- 타입 파일은 도메인 단위로 묶는다.

---

## 7. 금지 사항

- MVP 범위를 벗어나는 타입 확장
- 아직 쓰이지 않는 추정 필드 추가
- 외부 라이브러리로 데이터 구조 문제 해결
- 같은 의미의 타입을 여러 파일에 중복 정의
