// components/ui/SubmitButton.tsx

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  text: string;
}

export default function SubmitButton({
  isLoading,
  loadingText,
  text,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-3
        rounded-lg
        font-medium
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {isLoading ? loadingText : text}
    </button>
  );
}
