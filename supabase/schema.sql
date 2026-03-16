-- M&M Auto Solutions & M² Solutions Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Service Requests Table
CREATE TABLE IF NOT EXISTS service_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    request_type TEXT NOT NULL, -- 'service', 'mechanic', 'wrecker'
    service_category TEXT,
    vehicle_year TEXT,
    vehicle_make TEXT,
    vehicle_model TEXT,
    vehicle_plate TEXT,
    issue_details TEXT,
    parish TEXT,
    community TEXT,
    address TEXT,
    urgency TEXT,
    preferred_date DATE,
    preferred_time_window TEXT,
    attachments TEXT[],
    wants_financing BOOLEAN DEFAULT FALSE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    status TEXT DEFAULT 'New', -- New, Contacted, Diagnosing, Quoted, Approved, Scheduled, In Progress, Completed, Closed
    admin_notes TEXT
);

-- Parts Inventory Table
CREATE TABLE IF NOT EXISTS parts_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    fitment_notes TEXT,
    stock_status TEXT DEFAULT 'In Stock', -- In Stock, Limited, Pre-order, Out of Stock
    price_min NUMERIC,
    price_max NUMERIC,
    lead_time TEXT,
    images TEXT[],
    is_active BOOLEAN DEFAULT TRUE
);

-- Parts Requests Table
CREATE TABLE IF NOT EXISTS parts_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    part_name TEXT NOT NULL,
    vehicle_year TEXT,
    vehicle_make TEXT,
    vehicle_model TEXT,
    notes TEXT,
    parish TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    status TEXT DEFAULT 'New',
    admin_notes TEXT
);

-- Financing Applications Table
CREATE TABLE IF NOT EXISTS financing_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    asset_type TEXT NOT NULL,
    asset_description TEXT,
    quote_amount NUMERIC,
    down_payment NUMERIC,
    monthly_budget NUMERIC,
    income_band TEXT,
    employment_type TEXT,
    parish TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    risk_tier TEXT DEFAULT 'C', -- A, B, C
    status TEXT DEFAULT 'New', -- New, Under Review, Conditioned Approval, Approved, Declined, Active, Completed, Defaulted
    admin_notes TEXT
);

-- Admin Users Table (Profiles)
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (Simplified for MVP, usually more restrictive)
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE financing_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public can create requests
CREATE POLICY "Public can create service requests" ON service_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create parts requests" ON parts_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create financing applications" ON financing_applications FOR INSERT WITH CHECK (true);

-- Public can view active inventory
CREATE POLICY "Public can view active inventory" ON parts_inventory FOR SELECT USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins have full access" ON service_requests FOR ALL USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));
CREATE POLICY "Admins have full access" ON parts_inventory FOR ALL USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));
CREATE POLICY "Admins have full access" ON parts_requests FOR ALL USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));
CREATE POLICY "Admins have full access" ON financing_applications FOR ALL USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));
CREATE POLICY "Admins have full access" ON admin_profiles FOR ALL USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));
