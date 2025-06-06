export type Visa = 'O-1' | 'EB-1A' | 'EB-2 NIW' | "I don't know";

export type LeadStatus = 'PENDING' | 'REACHED_OUT';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedInProfile: string;
  visasOfInterest: Visa[];
  resumeUrl?: string;
  additionalInfo?: string;
  status: LeadStatus;
  createdAt: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}