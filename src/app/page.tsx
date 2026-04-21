"use client";

import { useState } from "react";

import { createChecklist } from "@/features/checklists/create-checklist";
import type { Checklist, Scenario } from "@/types/checklist";

interface ScenarioCard {
  title: string;
  description: string;
  tag: Scenario;
}

const scenarios: ScenarioCard[] = [
  {
    title: "여행",
    description: "이동 일정과 숙박 준비에 맞는 기본 준비물을 바로 시작해요.",
    tag: "travel",
  },
  {
    title: "학교",
    description: "학교 가기 전에 챙길 기본 준비물을 빠르게 확인해요.",
    tag: "school",
  },
  {
    title: "운동",
    description: "운동 전후 루틴에 맞는 가방 체크리스트를 만들어요.",
    tag: "gym",
  },
];

export default function HomePage() {
  const [currentChecklist, setCurrentChecklist] = useState<Checklist | null>(null);

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentChecklist(createChecklist(scenario));
  };

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
                상황을 고르면
                <br />
                준비가 가벼워집니다
              </p>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                PackUp은 상황에 맞는 준비물 체크리스트를 빠르게 시작할 수 있도록
                도와주는 앱입니다. 이번 단계에서는 홈 화면에서 상황을 선택하면 새
                체크리스트를 즉시 생성해 다음 화면으로 이어질 임시 흐름을 만듭니다.
              </p>
            </div>
            <div className="rounded-[28px] bg-[#fff2dd] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
                Current Flow
              </p>
              <p className="mt-3 text-2xl font-bold text-stone-900">
                상황 선택과 체크리스트 생성 연결
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                카드를 클릭하면 `createChecklist`가 실행되고, 생성된 결과를 임시
                상태에 연결해 다음 단계 구현에 바로 사용할 수 있게 둡니다.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.tag}
              type="button"
              onClick={() => handleScenarioSelect(scenario.tag)}
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

        <section className="rounded-[32px] border border-stone-200/70 bg-white/85 p-8 shadow-[0_16px_48px_rgba(120,94,70,0.08)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                Generated Checklist
              </p>
              <h2 className="mt-2 text-3xl font-bold text-stone-900">
                {currentChecklist ? currentChecklist.title : "아직 생성된 체크리스트가 없어요"}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-500">
              {currentChecklist
                ? "선택한 상황으로 새 체크리스트가 만들어졌습니다. 이 결과는 저장되지 않으며, 다음 단계 연결을 위한 임시 상태로만 유지됩니다."
                : "상황 카드를 누르면 템플릿 기반 체크리스트가 생성되고, 여기에서 바로 결과를 확인할 수 있습니다."}
            </p>
          </div>

          {currentChecklist ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[24px] bg-stone-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Summary
                </p>
                <dl className="mt-4 space-y-3 text-sm text-stone-600">
                  <div className="flex items-center justify-between gap-4">
                    <dt>scenario</dt>
                    <dd className="font-semibold text-stone-900">
                      {currentChecklist.scenario}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt>items</dt>
                    <dd className="font-semibold text-stone-900">
                      {currentChecklist.items.length}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt>createdAt</dt>
                    <dd className="font-semibold text-stone-900">
                      {new Date(currentChecklist.createdAt).toLocaleTimeString("ko-KR")}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Items Preview
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {currentChecklist.items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-[20px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700"
                    >
                      <span className="font-medium text-stone-900">{item.name}</span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-stone-400">
                        {item.checked ? "checked" : "unchecked"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[24px] border border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-center text-sm leading-7 text-stone-500">
              선택된 상황이 아직 없습니다. 위 카드 중 하나를 눌러 체크리스트 생성
              흐름을 시작해 보세요.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
