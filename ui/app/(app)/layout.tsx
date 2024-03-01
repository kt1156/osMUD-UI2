"use client";

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function layout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
