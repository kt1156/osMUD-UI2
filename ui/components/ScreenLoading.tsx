import React from "react";

export default function ScreenLoading() {
  return (
    <div className="min-h-screen flex flex-col place-items-center justify-center text-primary-content">
      <span className="loading loading-bars loading-lg"></span>
      <p className="font-semibold mt-6">Loading MUD editor...</p>
    </div>
  );
}
