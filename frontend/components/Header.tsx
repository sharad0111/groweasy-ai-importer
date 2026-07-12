"use client";

import { DatabaseZap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <div className="mb-10 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="bg-blue-600 p-3 rounded-xl">

          <DatabaseZap className="text-white w-8 h-8" />

        </div>

        <div>

          <h1 className="text-4xl font-bold">
            GrowEasy AI Importer
          </h1>

          <p className="text-muted-foreground mt-1">
            AI Powered CRM Migration Tool
          </p>

        </div>

      </div>

      <ThemeToggle />

    </div>
  );
}