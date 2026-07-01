interface Props {
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
  isLastQuestion: boolean;
}

export default function NavigationButtons({
  onPrevious,
  onNext,
  onFinish,
  disablePrevious,
  disableNext,
  isLastQuestion,
}: Props) {
  return (
    <div className="flex justify-between mt-8">

      <button
        onClick={onPrevious}
        disabled={disablePrevious}
        className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>

      {!isLastQuestion ? (
        <button
          onClick={onNext}
          disabled={disableNext}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
        >
          Next
        </button>
      ) : (
        <button
          onClick={onFinish}
          className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Finish Interview
        </button>
      )}

    </div>
  );
}