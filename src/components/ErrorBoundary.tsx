import React from 'react';
import { reportError } from '../utils/monitoring';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    reportError(error, {
      componentStack: info.componentStack,
      path: window.location.pathname
    });
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-16 text-white">
        <section className="w-full max-w-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">
            SafetyWarden
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            We could not load this page cleanly.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            The issue has been recorded for review. You can reload the page or return to the homepage.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Reload Page
            </button>
            <a
              href="/"
              className="border border-slate-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-slate-950"
            >
              Go to Homepage
            </a>
          </div>
        </section>
      </main>
    );
  }
}
