import { DataService } from '@/services/data/dataService';

export const getHoseData = async (customerNumbers: string[]) => {
  return await DataService.getHoses();
};
