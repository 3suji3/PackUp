const scenarios = [
  {
    title: "여행",
    description: "이동 일정과 숙박 일수에 맞춰 준비물을 시작해요.",
    tag: "travel",
  },
  {
    title: "학교",
    description: "등교 전에 챙겨야 할 기본 준비물을 빠르게 확인해요.",
    tag: "school",
  },
  {
    title: "헬스",
    description: "운동 전후 루틴에 맞는 가방 체크리스트를 만들어요.",
    tag: "gym",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff6ec_0%,#fffaf5_48%,#f7efe5_100%)] px-6 py-10 text-stone-900">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center gap-8">
        <section className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(199,144,98,0.16)] backdrop-blur">
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            PackUp MVP
          </span>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <p className="font-[family-name:var(--font-display)] text-5xl leading-tight text-stone-900 md:text-6xl">
                상황을 고르면,
                <br />
                준비가 가벼워집니다.
              </p>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                PackUp은 상황에 맞는 준비물 체크리스트를 빠르게 시작할 수 있도록
                도와주는 앱입니다. 지금은 MVP 초기 세팅 단계라서 홈 화면과 기본
                구조만 준비되어 있습니다.
              </p>
            </div>
            <div className="rounded-[28px] bg-[#fff2dd] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
                Next Step
              </p>
              <p className="mt-3 text-2xl font-bold text-stone-900">
                상황 선택 흐름 연결
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                다음 구현 단계에서 선택 상태와 체크리스트 생성 로직을 이 화면에
                연결할 예정입니다.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <article
              key={scenario.tag}
              className="rounded-[28px] border border-stone-200/70 bg-white/85 p-6 shadow-[0_12px_40px_rgba(120,94,70,0.08)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                {scenario.tag}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-stone-900">
                {scenario.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-stone-600">
                {scenario.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
