"use client";

import LastUpdated from "@/components/LastUpdated";
import Navbar from "@/components/Navbar/Navbar";
import { MudContext } from "@/contexts/MudContext";
import MudParser from "@/services/MudParser";
import MudStore from "@/services/MudStore";
import { MudFile, DefaultMudInfo } from "@/types/Mud";
import React, { useState } from "react";

export default function Home() {
  const [mud, setMud] = useState<MudFile>({ ...DefaultMudInfo });
  const [loading, setLoading] = useState(true);

  const refreshMud = () => {
    setLoading(true);
    let loadedMud = MudStore.LoadJson();
    if (loadedMud == null) {
      setLoading(false);
      setMud({ ...DefaultMudInfo });
      return null;
    }

    let newMud = MudParser.parse(loadedMud);
    setMud(newMud);
    setLoading(false);
  };

  React.useEffect(function initMudLoad() {
    setTimeout(() => {
      refreshMud();
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col place-items-center justify-center">
        <span className="loading loading-bars loading-lg text-primary"></span>
        <p className="text-primary font-semibold mt-6">Loading MUD editor...</p>
      </div>
    );
  }

  return (
    <MudContext.Provider value={{ mud, refresh: refreshMud }}>
      <div className="flex flex-col gap-y-4">
        <Navbar />
        <section className="px-6 flex flex-col gap-y-2">
          <LastUpdated />
          <pre>{JSON.stringify(mud, undefined, 2)}</pre>
          <div className="border-b border-black" />
          <pre>{JSON.stringify(MudStore.LoadJson(), undefined, 2)}</pre>
        </section>
      </div>
    </MudContext.Provider>
  );
}
