import { apiCall } from './util';

export type CustomerResponse = {
  customerNumber: string;
  customerName: string;
};

export async function getCustomers(): Promise<CustomerResponse[]> {
  console.log('Getting customers...');
  const response = await apiCall<CustomerResponse[]>('/customer');
  console.log('Retrieved customers:', response.length);
  return response;
}
