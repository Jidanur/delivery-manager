export enum ServiceType {
  STANDARD = "Standard",
  EXPRESS = "Express",
  OVERNIGHT = "Overnight",
}

export enum DeliveryStatus {
  PENDING = "Pending",
  IN_TRANSIT = "In Transit",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

//TODO: Update delivery zones
export enum DeliveryZone {
  ZONE_1 = "Zone 1",
  ZONE_2 = "Zone 2",
  ZONE_3 = "Zone 3",
  ZONE_4 = "Zone 4",
}
export interface PackageInfo {
  package_id: number;
  delivery_address: string;
  delivery_zone: string;
  delivery_status: string;
  service_type: string;
  client_id?: number;
  driver_id?: number;
  created_at: string;
  updated_at: string;
  pickup_time?: string;
  delivery_time?: string;
  order_instructions?: string;
  order_comment?: string;
}

export interface PackageData {
  delivery_address?: string;
  delivery_zone?: DeliveryZone;
  delivery_status?: DeliveryStatus;
  client_id?: number;
  driver_id?: number;
  pickup_time?: string;
  delivery_time?: string;
  order_instructions?: string;
  order_comment?: string;
  service_type?: ServiceType;
}
