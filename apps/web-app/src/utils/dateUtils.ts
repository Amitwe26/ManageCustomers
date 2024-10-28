export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTime = (date?: Date) => {
  return date
    ? date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '';
};
export const formatDateForInput = (isoString: string): string => {
  return isoString.split('T')[0];
};
