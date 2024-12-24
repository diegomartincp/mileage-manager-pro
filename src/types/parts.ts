export type PartCategory = 
  | "Brake Pads"
  | "Brake Discs"
  | "Oil"
  | "Coolant"
  | "Brake Fluid"
  | "Wheels"
  | "Tires"
  | "Custom";

export interface Part {
  id: number;
  name: string;
  category: PartCategory;
  brand?: string;
  specifications?: {
    [key: string]: string;
  };
  notes?: string;
  createdAt: Date;
}