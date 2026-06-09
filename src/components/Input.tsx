import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full px-4 py-3 border rounded-lg
          outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          ${error ? "border-red-500" : ""}
        `}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
