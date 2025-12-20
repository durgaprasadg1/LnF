"use client";

import { Card, CardContent } from "@/components/ui/card";
import SectionWrapper from "./SectionWrapper";
import { Search, Upload } from "lucide-react";

export default function ActionCards() {
  return (
    <SectionWrapper>
      <div className="grid md:grid-cols-2 gap-8">

        <Card className="hover:shadow-xl transition">
          <CardContent className="p-6 flex gap-4 items-center">
            <Search size={40} className="text-gray-700" />
            <div>
              <h3 className="text-xl font-semibold">Report a Lost Item</h3>
              <p className="text-gray-600 mt-1">
                Tell us what you lost and let the campus help you find it.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition">
          <CardContent className="p-6 flex gap-4 items-center">
            <Upload size={40} className="text-gray-700" />
            <div>
              <h3 className="text-xl font-semibold">Post a Found Item</h3>
              <p className="text-gray-600 mt-1">
                Share details about what you found and help someone out.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </SectionWrapper>
  );
}
