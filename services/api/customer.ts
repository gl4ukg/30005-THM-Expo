import { apiCall } from './util';

export type Customer = {
  customerNumber: string;
  customerName: string;
};

export async function getCustomers(): Promise<Customer[]> {
  const response = await apiCall<Customer[]>('/customer');
  return response;
}
