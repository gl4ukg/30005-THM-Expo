import { useCallback } from 'react';

export interface FieldDependencyRule<TParent, TChild> {
  parentField: keyof TParent;
  childField: keyof TChild;
  getFilteredOptions: (
    parentValue: string | undefined,
    allOptions: string[],
  ) => string[];
}

export interface FieldDependencyConfig<T> {
  rules: FieldDependencyRule<T, T>[];
  allOptions: string[];
}

export const useFieldDependencies = <T extends Record<string, any>>(
  data: Partial<T>,
  config: FieldDependencyConfig<T>,
) => {
  const getFilteredOptionsForField = useCallback(
    (field: keyof T): string[] => {
      const rule = config.rules.find((r) => r.childField === field);

      if (!rule) {
        return config.allOptions;
      }

      const parentValue = data[rule.parentField] as string | undefined;
      return rule.getFilteredOptions(parentValue, config.allOptions);
    },
    [data, config],
  );

  const shouldResetField = useCallback(
    (parentField: keyof T, newParentValue: string | undefined): (keyof T)[] => {
      const fieldsToReset: (keyof T)[] = [];

      config.rules.forEach((rule) => {
        if (rule.parentField === parentField) {
          const currentChildValue = data[rule.childField] as string | undefined;
          const newFilteredOptions = rule.getFilteredOptions(
            newParentValue,
            config.allOptions,
          );

          if (
            currentChildValue &&
            !newFilteredOptions.includes(currentChildValue)
          ) {
            fieldsToReset.push(rule.childField);
          }
        }
      });

      return fieldsToReset;
    },
    [data, config],
  );

  const isParentField = useCallback(
    (field: keyof T): boolean => {
      return config.rules.some((rule) => rule.parentField === field);
    },
    [config],
  );

  return {
    getFilteredOptionsForField,
    shouldResetField,
    isParentField,
  };
};

export const createDefaultFilter =
  () =>
  (parentValue: string | undefined, allOptions: string[]): string[] => {
    return allOptions;
  };

export const createMockHoseStandardFilter =
  () =>
  (parentValue: string | undefined, allOptions: string[]): string[] => {
    if (!parentValue) {
      return allOptions;
    }

    const mockMapping: Record<string, string[]> = {
      'Option 1': ['Option 1', 'Option 2', 'Option 3'],
      'Option 2': ['Option 2', 'Option 4', 'Option 5'],
      'Option 3': ['Option 3', 'Option 6', 'Option 7'],
      'Option 4': ['Option 4', 'Option 8', 'Option 9'],
      'Option 5': ['Option 5', 'Option 1', 'Option 2'],
    };

    const availableOptions = mockMapping[parentValue] || allOptions;
    return allOptions.filter((option) => availableOptions.includes(option));
  };

export const createMockCouplingFilter =
  () =>
  (parentValue: string | undefined, allOptions: string[]): string[] => {
    if (!parentValue) {
      return allOptions;
    }

    const mockMapping: Record<string, string[]> = {
      'Option 1': ['Option 1', 'Option 3', 'Option 5'],
      'Option 2': ['Option 2', 'Option 4', 'Option 6'],
      'Option 3': ['Option 1', 'Option 2', 'Option 7'],
      'Option 4': ['Option 3', 'Option 4', 'Option 8'],
      'Option 5': ['Option 5', 'Option 6', 'Option 9'],
    };

    const availableOptions = mockMapping[parentValue] || allOptions;
    return allOptions.filter((option) => availableOptions.includes(option));
  };

export const createDependencyRule = <T>(
  parentField: keyof T,
  childField: keyof T,
  filterFunction: (
    parentValue: string | undefined,
    allOptions: string[],
  ) => string[],
): FieldDependencyRule<T, T> => ({
  parentField,
  childField,
  getFilteredOptions: filterFunction,
});
