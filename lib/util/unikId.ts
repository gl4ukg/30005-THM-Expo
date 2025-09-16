import { useAppContext } from '@/context/ContextProvider';

export const generateNumericDraftId = (existingDraftIds: number[]) => {
  let randomNum: number | undefined = undefined;
  const getNumber = () => {
    // Generate random number between 1,000,000 and 9,999,999
    // Generate random number in range
    return Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  };

  while (randomNum === undefined || existingDraftIds.includes(randomNum)) {
    randomNum = getNumber();
  }

  return randomNum;
};
