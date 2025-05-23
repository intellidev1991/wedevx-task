"use client";

import { useState, useEffect } from "react";
import { getLeads } from "@/lib/api";
import { Lead, LeadStatus } from "@/types";
import AdminLayout from "@/components/layout/admin-layout";
import { LeadTable } from "@/components/leads/lead-table";
import { StatusFilter } from "@/components/leads/status-filter";
import { SearchBar } from "@/components/leads/search-bar";
import { Title } from "@/components/ui/mixed/title";
import { TableError } from "@/components/leads/table-error";
import { LoadingSpinner } from "@/components/ui/mixed/loading-spinner";
import { SearchNotFound } from "@/components/leads/search-not-found";

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const filters = statusFilter ? { status: statusFilter } : undefined;
        const fetchedLeads = await getLeads(filters);
        setLeads(fetchedLeads);
        setFilteredLeads(fetchedLeads);
      } catch (err) {
        setError("Failed to load leads. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [statusFilter]);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = leads.filter(
        (lead) =>
          lead.firstName.toLowerCase().includes(query) ||
          lead.lastName.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.country.toLowerCase().includes(query)
      );
      setFilteredLeads(filtered);
    } else {
      setFilteredLeads(leads);
    }
  }, [searchQuery, leads]);

  const handleStatusChange = (id: string, status: LeadStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const handleStatusFilter = (status: LeadStatus | null) => {
    setStatusFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Title>Leads</Title>

        <div className="flex flex-col sm:flex-row justify-start gap-4">
          <SearchBar onSearch={handleSearch} />
          <StatusFilter onFilterChange={handleStatusFilter} />
        </div>

        {loading && <LoadingSpinner />}

        {!loading && error && <TableError error={error} />}

        {!loading && !error && filteredLeads.length === 0 && (
          <SearchNotFound searchQuery={searchQuery} />
        )}

        {!loading && !error && filteredLeads.length > 0 && (
          <LeadTable
            leads={filteredLeads}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </AdminLayout>
  );
}
