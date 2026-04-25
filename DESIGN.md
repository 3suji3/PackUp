# DESIGN.md

## 1. 디자인 방향

PackUp은 단순한 체크리스트 앱이 아니라  
“기분 좋게 준비하게 만드는 서비스”를 목표로 한다.

---

## 2. 디자인 컨셉

### 핵심 컨셉

- 토스 스타일
- 미니멀 + 귀여움
- 부드러운 인터랙션

---

## 3. 비주얼 스타일

### 기본 스타일

- flat design
- pastel color
- rounded edges
- soft shadow
- clean UI

---

### 색상

- primary: warm orange
- background: orange-50 / white
- accent: rose, 행동 유도 버튼에만 제한적으로 사용

---

### 형태

- 모든 요소는 둥글게
- sharp edge 최소화
- 카드형 UI

---

## 4. 캐릭터 디자인

### 캐릭터 컨셉

- 귀여운 가방 캐릭터
- 둥근 형태
- 간단한 얼굴 (눈 + 입)

---

### 성격

- cheerful
- playful
- 약간 바보같이 귀여움

---

### 행동

- bouncing (살짝 튀기)
- waving (손 흔들기)
- reacting (체크 시 반응)

---

### 사용 위치

- 홈 화면
- 빈 상태 화면
- 완료 상태

---

## 5. UI 구조

- 카드 기반 리스트
- 큰 버튼
- 여백 넉넉

---

## 6. 인터랙션

- 체크 시 애니메이션
- 버튼 hover 효과
- 리스트 추가 시 등장 애니메이션

---

## 7. UX 원칙

- 클릭 최소화
- 상태 즉시 반영
- 시각적 피드백 강조

---

## 8. 금지 사항

- 복잡한 UI 금지
- 색상 과다 사용 금지
- 애니메이션 과도 사용 금지
---

## 2026-04-26 update: Korean microcopy and light motion

- PackUp의 주요 UI 문구는 한국어 중심으로 작성한다.
- 문구 톤은 명령형보다 도와주는 느낌을 우선한다.
- Toss-style minimal 방향은 유지하되, 너무 차가운 SaaS 문구는 피한다.
- 색상은 white / slate / warm orange 중심으로 제한한다.
- 애니메이션은 Tailwind transition과 작은 CSS keyframes만 사용한다.
- 카드 등장, 상태 메시지 표시, 체크 상태 변화에만 짧고 부드러운 움직임을 둔다.

## 2026-04-26 update: Warm color system and clearer flow

- 기존 blue 중심 시각 언어를 제거하고 warm orange / slate / rose 중심으로 재정의한다.
- orange는 배경, 섹션 강조, 진행률처럼 PackUp의 따뜻한 분위기를 만드는 색으로 사용한다.
- rose는 행동 유도 버튼과 상황 카드의 주요 CTA 문구에만 제한적으로 사용한다.
- slate는 본문, 보조 정보, 저장 목록처럼 읽기와 구분이 중요한 영역에 사용한다.
- 첫 화면은 긴 설명보다 "준비할 상황을 골라주세요"라는 한 줄 행동 유도로 시작한다.
- 상황 선택 영역은 별도 강조 섹션으로 보여 사용자가 다음 행동을 바로 이해하게 한다.
- 체크리스트 영역은 현재 작업의 중심으로 유지하고, 저장 목록은 재사용/정리 보조 영역으로 낮은 시각 강도를 둔다.
- 흥미 요소는 진행률, 완료 메시지, 체크 시 작은 scale animation까지만 사용해 MVP의 단순함을 유지한다.
