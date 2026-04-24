import type { Scenario } from "@/types/checklist";

interface ScenarioCard {
  title: string;
  description: string;
  tag: Scenario;
}

const scenarios: ScenarioCard[] = [
  {
    title: "Travel",
    description: "Start a quick packing list for moving days, overnight stays, and short trips.",
    tag: "travel",
  },
  {
    title: "School",
    description: "Review the essentials you usually want before leaving for class.",
    tag: "school",
  },
  {
    title: "Gym",
    description: "Build a simple workout checklist for your bag before heading out.",
    tag: "gym",
  },
];

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
          className="rounded-[28px] border border-stone-200/70 bg-white/85 p-6 text-left shadow-[0_12px_40px_rgba(120,94,70,0.08)] transition-transform duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_18px_48px_rgba(199,144,98,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf5]"
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
        </button>
      ))}
    </section>
  );
}
