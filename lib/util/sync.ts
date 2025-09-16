export const syncData = ({
  userEventsArray,
  onUpdate,
}: {
  userEventsArray: any[];
  onUpdate: (isLoading: boolean) => void;
}) => {
  console.log('syncing data');
  onUpdate(true);
  setTimeout(() => {
    onUpdate(false);
  }, 2000);
};
