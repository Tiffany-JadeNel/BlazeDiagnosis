export type VehicleStatus = 'Completed' | 'In service' | 'Pending';

export type VehicleRecord = {
  color?: string;
  engineType?: string;
  fuel: string;
  id: string;
  make: string;
  model: string;
  registration: string;
  status: VehicleStatus;
  transmission: string;
  variant: string;
  vin: string;
  year: string;
};
