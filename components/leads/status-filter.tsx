"use client";

import { useState } from "react";
import { LeadStatus } from "@/types";
import { ChevronDown } from "lucide-react";

interface StatusFilterProps {
  onFilterChange: (status: LeadStatus | null) => void;
}

export function StatusFilter({ onFilterChange }: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | null>(null);

  const handleStatusSelect = (status: LeadStatus | null) => {
    setSelectedStatus(status);
    onFilterChange(status);
    setIsOpen(false);
  };

  return (
    <div className="relative" aria-label="Status filter">
      <button
        type="button"
        aria-label="Filter by status"
        className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedStatus
          ? selectedStatus === "PENDING"
            ? "Pending"
            : "Reached Out"
          : "Status"}
        <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          aria-label="Status filter dropdown"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleStatusSelect(null)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              All
            </button>
            <button
              onClick={() => handleStatusSelect("PENDING")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Pending
            </button>
            <button
              onClick={() => handleStatusSelect("REACHED_OUT")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Reached Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
