"use client";

import React, { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function CalendarComponent() {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="p-4">
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={(range) => setSelectedRange(range)}
        numberOfMonths={2}
        footer={<p>Select dates to view availability.</p>}
      />
      {selectedRange?.from && selectedRange?.to && (
        <div className="mt-4">
          <p>
            You selected from <b>{selectedRange.from.toLocaleDateString()}</b>{" "}
            to <b>{selectedRange.to.toLocaleDateString()}</b>.
          </p>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
