"use client";

import React, { PropsWithChildren, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function layout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Suspense>
  );
}
