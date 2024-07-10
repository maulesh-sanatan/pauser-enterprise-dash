"use client";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section class="bg-white dark:bg-gray-900 h-screen">
          <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <div class="mx-auto max-w-screen-sm text-center">
              <h1 class="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">
                500
              </h1>
              <p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                Internal Server Error.
              </p>
              <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry something went wrong.
              </p>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
