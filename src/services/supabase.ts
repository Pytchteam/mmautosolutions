import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ServiceRequest = {
  id: string;
  created_at: string;
  request_type: string;
  service_category: string;
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_plate?: string;
  issue_details: string;
  parish: string;
  community: string;
  address: string;
  urgency: string;
  preferred_date?: string;
  preferred_time_window?: string;
  attachments?: string[];
  wants_financing: boolean;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  status: string;
  admin_notes?: string;
};

export type PartsInventory = {
  id: string;
  created_at: string;
  sku: string;
  name: string;
  category: string;
  description: string;
  fitment_notes: string;
  stock_status: string;
  price_min: number;
  price_max: number;
  lead_time: string;
  images: string[];
  is_active: boolean;
};

export type PartsRequest = {
  id: string;
  created_at: string;
  part_name: string;
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  notes: string;
  parish: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  status: string;
  admin_notes?: string;
};

export type FinancingApplication = {
  id: string;
  created_at: string;
  asset_type: string;
  asset_description: string;
  quote_amount: number;
  down_payment: number;
  monthly_budget: number;
  income_band: string;
  employment_type: string;
  parish: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  risk_tier: string;
  status: string;
  admin_notes?: string;
};
