interface ChecklistActionBarProps {
  canSave: boolean;
  feedbackMessage: string | null;
  onSave: () => void;
}

export function ChecklistActionBar({
  canSave,
  feedbackMessage,
  onSave,
}: ChecklistActionBarProps) {
  return (
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={!canSave}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition duration-150 hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-100"
        >
          이 리스트 저장하기
        </button>
        <p className="text-sm leading-6 text-slate-500">
          저장해두면 다음에도 다시 쓸 수 있어요.
        </p>
      </div>
      <p
        className={`rounded-full px-3 py-1 text-sm font-medium transition duration-200 ${
          feedbackMessage
            ? "animate-packup-enter bg-blue-50 text-blue-700 shadow-[0_8px_22px_rgba(37,99,235,0.10)]"
            : "text-slate-400"
        }`}
        aria-live="polite"
      >
        {feedbackMessage ?? "아직 새 소식은 없어요."}
      </p>
    </div>
  );
}
