"use client";

import { useState } from "react";
import { Lead, LeadStatus } from "@/types";
import { updateLeadStatus } from "@/lib/api";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { format } from "date-fns";

interface LeadTableProps {
  leads: Lead[];
  onStatusChange: (id: string, status: LeadStatus) => void;
}

export function LeadTable({ leads, onStatusChange }: LeadTableProps) {
  const [sortField, setSortField] = useState<keyof Lead>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 8;

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const fieldA = a[sortField] as string;
    const fieldB = b[sortField] as string;

    if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = sortedLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const handleReachOut = async (id: string) => {
    try {
      await updateLeadStatus(id, "REACHED_OUT");
      onStatusChange(id, "REACHED_OUT");
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
  };

  const SortIcon = ({ field }: { field: keyof Lead }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="inline w-4 h-4" />
    ) : (
      <ChevronDown className="inline w-4 h-4" />
    );
  };

  const renderHeaders = () => (
    <thead>
      <tr className="border-b border-border text-left">
        <th
          className="px-6 py-4 font-medium text-sm cursor-pointer"
          onClick={() => handleSort("lastName")}
        >
          Name <SortIcon field="lastName" />
        </th>
        <th
          className="px-6 py-4 font-medium text-sm cursor-pointer"
          onClick={() => handleSort("createdAt")}
        >
          Submitted <SortIcon field="createdAt" />
        </th>
        <th
          className="px-6 py-4 font-medium text-sm cursor-pointer"
          onClick={() => handleSort("status")}
        >
          Status <SortIcon field="status" />
        </th>
        <th
          className="px-6 py-4 font-medium text-sm cursor-pointer"
          onClick={() => handleSort("country")}
        >
          Country <SortIcon field="country" />
        </th>
        <th className="px-6 py-4 font-medium text-sm text-right">Actions</th>
      </tr>
    </thead>
  );

  const renderBody = () => (
    <tbody>
      {currentLeads.map((lead) => (
        <tr
          key={lead.id}
          className="border-b border-border hover:bg-muted/30 transition-colors"
        >
          <td className="px-6 py-4 whitespace-nowrap">
            {lead.firstName} {lead.lastName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {format(new Date(lead.createdAt), "MM/dd/yyyy, h:mm a")}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                lead.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {lead.status === "PENDING" ? "Pending" : "Reached Out"}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">{lead.country}</td>
          <td className="px-6 py-4 whitespace-nowrap text-right">
            {lead.status === "PENDING" && (
              <button
                onClick={() => handleReachOut(lead.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MessageCircle className="mr-1 h-4 w-4" />
                Reach Out
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );

  const renderPagination = () => (
    <div>
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Previous</span>
          &lt;
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
              currentPage === index + 1
                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Next</span>
          &gt;
        </button>
      </nav>
    </div>
  );

  const renderCountStatus = () => (
    <div>
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{indexOfFirstLead + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(indexOfLastLead, leads.length)}
        </span>{" "}
        of <span className="font-medium">{leads.length}</span> results
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" aria-label="Leads table">
          {renderHeaders()}
          {renderBody()}
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-3 bg-white">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          {renderCountStatus()}
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === index + 1
                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
