// components/layouts/AuthLayout.tsx

import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">{title}</h1>

          <p className="text-slate-500 mt-2">{subtitle}</p>
        </div>

        {children}

        <div className="mt-6 text-center">{footer}</div>
      </div>
    </div>
  );
}
