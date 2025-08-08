import { useMemo, useCallback } from 'react';

export interface FieldDependencyRule<T> {
  parentField: keyof T;
  childField: keyof T;
  getFilteredOptions: (
    parentValue: string | undefined,
    allOptions: string[],
  ) => string[];
}

export interface FieldDependencyConfig<T> {
  childToParentRuleMap: Map<keyof T, FieldDependencyRule<T>>;
  parentToChildRulesMap: Map<keyof T, FieldDependencyRule<T>[]>;
  parentFields: Set<keyof T>;
  allOptions: string[];
}

export const useFieldDependencies = <T extends Record<string, any>>(
  data: Partial<T>,
  config: FieldDependencyConfig<T>,
) => {
  const getFilteredOptionsForField = useCallback(
    (field: keyof T): string[] => {
      const rule = config.childToParentRuleMap.get(field);
      if (!rule) {
        return config.allOptions;
      }
      const parentValue = data[rule.parentField] as string | undefined;
      return rule.getFilteredOptions(parentValue, config.allOptions);
    },
    [data, config],
  );

  const getFieldsToReset = useCallback(
    (parentField: keyof T, newParentValue: string | undefined): (keyof T)[] => {
      const rules = config.parentToChildRulesMap.get(parentField);
      if (!rules) {
        return [];
      }

      return rules.reduce((acc: (keyof T)[], rule) => {
        const childValue = data[rule.childField] as string | undefined;
        const newOptions = rule.getFilteredOptions(
          newParentValue,
          config.allOptions,
        );
        if (childValue && !newOptions.includes(childValue)) {
          acc.push(rule.childField);
        }
        return acc;
      }, []);
    },
    [data, config],
  );

  const isParentField = useCallback(
    (field: keyof T): boolean => {
      return config.parentFields.has(field);
    },
    [config],
  );

  return {
    getFilteredOptionsForField,
    shouldResetField: getFieldsToReset,
    isParentField,
  };
};

export const createMapFilter =
  (mapping: Record<string, string[]>, defaultToAll: boolean = true) =>
  (parentValue: string | undefined, allOptions: string[]): string[] => {
    if (!parentValue) {
      return defaultToAll ? allOptions : [];
    }
    const mappedOptions = mapping[parentValue] ?? [];
    return allOptions.filter((option) => mappedOptions.includes(option));
  };

export type DependencyMap<T> = {
  [K in keyof T]?: {
    childField: keyof T;
    filterMap: Record<string, string[]>;
  };
};

export const buildDependencyConfig = <T extends Record<string, any>>(
  dependencyMap: DependencyMap<T>,
  allOptions: string[],
): FieldDependencyConfig<T> => {
  const config: FieldDependencyConfig<T> = {
    childToParentRuleMap: new Map(),
    parentToChildRulesMap: new Map(),
    parentFields: new Set(),
    allOptions,
  };

  for (const [parentKey, ruleConfig] of Object.entries(dependencyMap)) {
    if (ruleConfig) {
      const parentField = parentKey as keyof T;
      const { childField, filterMap } = ruleConfig;

      const rule: FieldDependencyRule<T> = {
        parentField,
        childField,
        getFilteredOptions: createMapFilter(filterMap),
      };

      config.parentFields.add(parentField);
      config.childToParentRuleMap.set(childField, rule);

      if (!config.parentToChildRulesMap.has(parentField)) {
        config.parentToChildRulesMap.set(parentField, []);
      }
      config.parentToChildRulesMap.get(parentField)!.push(rule);
    }
  }

  return config;
};
