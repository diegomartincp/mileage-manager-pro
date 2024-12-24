export type MaintenanceCategory = 
  | "Oil Change"
  | "Tire Service"
  | "Brake Service"
  | "Regular Maintenance"
  | "Parts Replacement"
  | "Other";

export interface MaintenanceRecord {
  id?: number;
  date?: Date;
  kilometers: number;
  category: MaintenanceCategory;
  notes: string;
}