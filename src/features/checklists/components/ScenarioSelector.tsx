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
    <section className="grid gap-4 md:grid-cols-3">
      {scenarios.map((scenario) => (
        <button
          key={scenario.tag}
          type="button"
          onClick={() => onSelectScenario(scenario.tag)}
          className="animate-packup-enter rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-[0_12px_36px_rgba(15,23,42,0.05)] transition duration-150 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_44px_rgba(15,23,42,0.08)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            {scenarioLabels[scenario.tag]}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {scenario.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            {scenario.description}
          </p>
        </button>
      ))}
    </section>
  );
}
