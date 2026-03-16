import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-JM', {
    style: 'currency',
    currency: 'JMD',
  }).format(amount);
}

export const JAMAICA_PARISHES = [
  "Kingston", "St. Andrew", "St. Catherine", "Clarendon", "Manchester", 
  "St. Elizabeth", "Westmoreland", "Hanover", "St. James", "Trelawny", 
  "St. Ann", "St. Mary", "Portland", "St. Thomas"
];

export const SERVICE_CATEGORIES = [
  "General Servicing", "Engine Repair", "Transmission", "Brakes & Suspension",
  "Electrical & AC", "Body Work & Paint", "Diagnostics", "Tyres & Alignment"
];

export const INCOME_BANDS = [
  "Under $100k JMD", "$100k - $250k JMD", "$250k - $500k JMD", "Over $500k JMD"
];

export const EMPLOYMENT_TYPES = [
  "Full-time Employed", "Part-time Employed", "Self-Employed", "Contractor", "Other"
];
