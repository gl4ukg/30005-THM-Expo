export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';

  try {
    const [day, month, year] = dateString.split('/');

    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const formattedDay = date.getDate();
    const formattedMonth = date
      .toLocaleString('default', {
        month: 'short',
      })
      .toUpperCase();
    const formattedYear = date.getFullYear();

    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

export const  stringToDate = (dateString: string) => {

  try {
    const parts = dateString.split('/');
    return new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]));
      } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
  };