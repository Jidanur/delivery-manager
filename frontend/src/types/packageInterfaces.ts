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
    delivery_zone?: string;
    delivery_status?: string;
    client_id?:number
    driver_id?: number;
    pickup_time?: string;
    delivery_time?: string;
    order_instructions?: string;
    order_comment?: string;
  }
  