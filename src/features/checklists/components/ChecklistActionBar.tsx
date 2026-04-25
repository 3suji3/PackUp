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
    <div className="mt-6 flex flex-col gap-3 rounded-[24px] border border-stone-200/70 bg-stone-50/80 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={!canSave}
          className="inline-flex h-11 items-center justify-center rounded-[16px] bg-stone-900 px-5 text-sm font-semibold text-white transition duration-150 hover:bg-orange-500 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-100"
        >
          Save current checklist
        </button>
        <p className="text-sm leading-6 text-stone-500">
          Saved checklists can be loaded again from the list below.
        </p>
      </div>
      <p
        className={`text-sm font-medium transition ${
          feedbackMessage ? "text-orange-700" : "text-stone-400"
        }`}
        aria-live="polite"
      >
        {feedbackMessage ?? "No recent updates yet."}
      </p>
    </div>
  );
}
