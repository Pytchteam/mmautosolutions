import { z } from 'zod';

export const serviceRequestSchema = z.object({
  request_type: z.enum(['service', 'mechanic', 'wrecker']),
  service_category: z.string().min(1, "Please select a category"),
  vehicle_year: z.string().min(4, "Invalid year"),
  vehicle_make: z.string().min(1, "Make is required"),
  vehicle_model: z.string().min(1, "Model is required"),
  vehicle_plate: z.string().optional(),
  issue_details: z.string().min(10, "Please provide more details"),
  parish: z.string().min(1, "Select a parish"),
  community: z.string().min(1, "Community is required"),
  address: z.string().min(5, "Address is required"),
  urgency: z.enum(['Normal', 'Urgent', 'Emergency']),
  preferred_date: z.string().optional(),
  preferred_time_window: z.string().optional(),
  wants_financing: z.boolean().default(false),
  customer_name: z.string().min(2, "Name is required"),
  customer_phone: z.string().min(10, "Valid phone required"),
  customer_email: z.string().email("Invalid email").optional().or(z.literal('')),
});

export const partsRequestSchema = z.object({
  part_name: z.string().min(2, "Part name is required"),
  vehicle_year: z.string().min(4, "Invalid year"),
  vehicle_make: z.string().min(1, "Make is required"),
  vehicle_model: z.string().min(1, "Model is required"),
  notes: z.string().optional(),
  parish: z.string().min(1, "Select a parish"),
  customer_name: z.string().min(2, "Name is required"),
  customer_phone: z.string().min(10, "Valid phone required"),
  customer_email: z.string().email("Invalid email").optional().or(z.literal('')),
});

export const financingApplicationSchema = z.object({
  asset_type: z.string().min(1, "Asset type is required"),
  asset_description: z.string().min(10, "Provide details about the asset/service"),
  quote_amount: z.number().min(1000, "Minimum amount is $1,000"),
  down_payment: z.number().min(0),
  monthly_budget: z.number().min(1000),
  income_band: z.string().min(1, "Select income band"),
  employment_type: z.string().min(1, "Select employment type"),
  parish: z.string().min(1, "Select a parish"),
  customer_name: z.string().min(2, "Name is required"),
  customer_phone: z.string().min(10, "Valid phone required"),
  customer_email: z.string().email("Invalid email").optional().or(z.literal('')),
});
