# FRONTEND.md

## 1. 목적

이 문서는 PackUp 프론트엔드 구현 규칙을 정의한다.

목표:
- 코드 일관성 유지
- 구조 안정성 확보
- 유지보수 용이성

---

## 2. 폴더 구조
src/
├── app/
├── components/
├── features/
├── hooks/
├── store/
├── utils/
└── types/

---

## 3. 컴포넌트 규칙

- UI와 로직 분리
- 재사용 가능하게 작성
- props 명확하게 정의

---

## 4. 상태 관리

- 전역 상태 → Context API
- 지역 상태 → useState
- 불필요한 전역 상태 금지

---

## 5. 네이밍 규칙

- 컴포넌트: PascalCase
- 변수/함수: camelCase
- 파일명: kebab-case

---

## 6. 금지 사항

- props drilling 과도 사용 금지
- 하드코딩 남발 금지
- 상태 중복 정의 금지

---

- Tailwind 기준 명확히
- 컴포넌트 분리 기준 강화