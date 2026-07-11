"use client";

import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  imported: number;
  skipped: number;
}

export default function StatsCards({
  imported,
  skipped,
}: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">

      <Card>

        <CardContent className="p-6">

          <h2 className="text-gray-500">
            Imported
          </h2>

          <h1 className="text-4xl font-bold text-green-600">

            <CountUp end={imported} />

          </h1>

        </CardContent>

      </Card>

      <Card>

        <CardContent className="p-6">

          <h2 className="text-gray-500">
            Skipped
          </h2>

          <h1 className="text-4xl font-bold text-red-500">

            <CountUp end={skipped} />

          </h1>

        </CardContent>

      </Card>

    </div>
  );
}