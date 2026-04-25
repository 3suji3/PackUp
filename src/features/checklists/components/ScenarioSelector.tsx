import type { Scenario } from "@/types/checklist";

interface ScenarioCard {
  title: string;
  description: string;
  tag: Scenario;
}

const scenarios: ScenarioCard[] = [
  {
    title: "여행 준비",
    description: "숙소, 이동, 짐 챙기기까지 가볍게 확인해요.",
    tag: "travel",
  },
  {
    title: "학교 가기",
    description: "나가기 전에 필요한 물건을 빠뜨리지 않게 챙겨요.",
    tag: "school",
  },
  {
    title: "운동 가방",
    description: "운동 전후에 필요한 준비물을 미리 확인해요.",
    tag: "gym",
  },
];

const scenarioLabels: Record<Scenario, string> = {
  travel: "여행",
  school: "학교",
  gym: "운동",
};

interface ScenarioSelectorProps {
  onSelectScenario: (scenario: Scenario) => void;
}

export function ScenarioSelector({
  onSelectScenario,
}: ScenarioSelectorProps) {
  return (
    <section className="animate-packup-enter rounded-3xl border border-orange-200 bg-white p-5 shadow-[0_16px_48px_rgba(124,45,18,0.08)] md:p-6">
      <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
            상황 선택
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">
            준비할 상황을 골라주세요
          </h2>
        </div>
        <p className="text-sm leading-6 text-slate-500">
          선택하면 바로 체크리스트가 만들어져요.
        </p>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {scenarios.map((scenario) => (
          <button
            key={scenario.tag}
            type="button"
            onClick={() => onSelectScenario(scenario.tag)}
            className="rounded-2xl border border-orange-100 bg-orange-50 p-5 text-left transition duration-150 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-[0_14px_34px_rgba(124,45,18,0.10)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
              {scenarioLabels[scenario.tag]}
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-950">
              {scenario.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {scenario.description}
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-rose-600">
              리스트 만들기
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
