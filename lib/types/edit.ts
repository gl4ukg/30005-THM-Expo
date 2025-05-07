export type EditProps<T> = {
  info: Partial<T>;
  onInputChange: (field: keyof T, value: T[keyof T] | undefined) => void;
  showValidationErrors?: boolean;
};
