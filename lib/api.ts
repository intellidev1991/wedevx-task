import { Lead, LeadStatus, Visa } from "@/types";
import { v4 as uuidv4 } from "uuid";

let LEADS: Lead[] = [
  {
    id: "1",
    firstName: "Jorge",
    lastName: "Ruiz",
    email: "jorge@example.com",
    linkedInProfile: "https://linkedin.com/in/jorgeruiz",
    visasOfInterest: ["O-1"],
    status: "PENDING",
    createdAt: "2024-02-02T14:45:00Z",
    country: "Mexico",
  },
  {
    id: "2",
    firstName: "Bahar",
    lastName: "Zamir",
    email: "bahar@example.com",
    linkedInProfile: "https://linkedin.com/in/baharzamir",
    visasOfInterest: ["EB-1A"],
    status: "PENDING",
    createdAt: "2024-02-02T14:45:00Z",
    country: "Mexico",
  },
  {
    id: "3",
    firstName: "Mary",
    lastName: "Lopez",
    email: "mary@example.com",
    linkedInProfile: "https://linkedin.com/in/marylopez",
    visasOfInterest: ["EB-2 NIW"],
    status: "PENDING",
    createdAt: "2024-02-02T14:45:00Z",
    country: "Brazil",
  },
  {
    id: "4",
    firstName: "Li",
    lastName: "Zijin",
    email: "li@example.com",
    linkedInProfile: "https://linkedin.com/in/lizijin",
    visasOfInterest: ["O-1"],
    status: "PENDING",
    createdAt: "2024-02-02T14:45:00Z",
    country: "South Korea",
  },
  {
    id: "5",
    firstName: "Mark",
    lastName: "Antonov",
    email: "mark@example.com",
    linkedInProfile: "https://linkedin.com/in/markantonov",
    visasOfInterest: ["EB-1A"],
    status: "PENDING",
    createdAt: "2024-02-02T14:45:00Z",
    country: "Russia",
  },
  {
    id: "6",
    firstName: "Jane",
    lastName: "Ma",
    email: "jane@example.com",
    linkedInProfile: "https://linkedin.com/in/janema",
    visasOfInterest: ["EB-2 NIW"],
    status: "PENDING",
    createdAt: "2024-02-02T14:45:00Z",
    country: "Mexico",
  },
  {
    id: "7",
    firstName: "Anand",
    lastName: "Jain",
    email: "anand@example.com",
    linkedInProfile: "https://linkedin.com/in/anandjain",
    visasOfInterest: ["O-1"],
    status: "REACHED_OUT",
    createdAt: "2024-02-02T14:45:00Z",
    country: "Mexico",
  },
  {
    id: "8",
    firstName: "Anna",
    lastName: "Voronova",
    email: "anna@example.com",
    linkedInProfile: "https://linkedin.com/in/annavoronova",
    visasOfInterest: ["EB-1A"],
    status: "PENDING",
    createdAt: "2024-02-02T14:45:00Z",
    country: "France",
  },
];

export async function getLeads(filters?: {
  status?: LeadStatus;
}): Promise<Lead[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!filters) return LEADS;

  return LEADS.filter((lead) => {
    if (filters.status && lead.status !== filters.status) {
      return false;
    }
    return true;
  });
}

export async function getLead(id: string): Promise<Lead | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const lead = LEADS.find((l) => l.id === id);
  return lead || null;
}

export async function createLead(
  leadData: Omit<Lead, "id" | "status" | "createdAt">
): Promise<Lead> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newLead: Lead = {
    ...leadData,
    id: uuidv4(),
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  LEADS = [newLead, ...LEADS];
  return newLead;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<Lead | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const leadIndex = LEADS.findIndex((l) => l.id === id);
  if (leadIndex === -1) return null;

  const updatedLead = { ...LEADS[leadIndex], status };
  LEADS[leadIndex] = updatedLead;

  return updatedLead;
}
