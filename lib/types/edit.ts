export type EditProps<T> = {
  info: T;
  onInputChange: (field: keyof T, value: T[keyof T]) => void;
};
