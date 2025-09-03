import { HoseData } from '../types/hose';

export const getDefaultRequiredHoseData = (): Pick<
  HoseData,
  | 'itemDescription'
  | 'productionDate'
  | 'installedDate'
  | 'criticality'
  | 'hoseType'
  | 'hoseLength_mm'
  | 'wp_BAR'
  | 'ferrule1'
  | 'ferrule2'
  | 'insert1'
  | 'insert2'
  //| 'genericHoseType'
  | 'typeFittingEnd1'
  | 'genericDimensionEnd1'
  | 'genderEnd1'
  | 'angleEnd1'
  | 'materialQualityEnd1'
  | 'typeFittingEnd2'
  | 'genericDimensionEnd2'
  | 'genderEnd2'
  | 'angleEnd2'
> => ({
  itemDescription: '',
  productionDate: '',
  installedDate: new Date().toISOString(),
  criticality: 0,
  hoseType: '',
  hoseLength_mm: '',
  wp_BAR: '',
  ferrule1: '',
  ferrule2: '',
  insert1: '',
  insert2: '',
  //genericHoseType: '',
  typeFittingEnd1: '',
  genericDimensionEnd1: '',
  genderEnd1: '',
  angleEnd1: '',
  materialQualityEnd1: '',
  typeFittingEnd2: '',
  genericDimensionEnd2: '',
  genderEnd2: '',
  angleEnd2: '',
});

export const emailValidation = (email: string): true | string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return true;
  } else {
    return 'Invalid email address. Please enter a valid email in the format: example@example.com';
  }
};

export const passwordRequirements = (password: string): true | string => {
  const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
  const upperCasePattern = /[A-Z]/;
  const lowerCasePattern = /[a-z]/;
  const numberPattern = /[0-9]/;

  if (password.length < 8 || password.length > 64) {
    return 'Password must be between 8 to 64 characters long.';
  }
  if (!specialCharacterPattern.test(password)) {
    return 'Password must contain at least one special character.';
  }
  if (!upperCasePattern.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!lowerCasePattern.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!numberPattern.test(password)) {
    return 'Password must contain at least one number.';
  }

  return true;
};

export const validatePassword = (
  newPassword: string,
  confirmPassword: string,
): true | string => {
  if (newPassword !== confirmPassword) {
    return 'Passwords do not match';
  }
  return true;
};

type PossibleType = string | number | undefined | null;
export const areValuesEqual = (a: PossibleType, b: PossibleType): boolean => {
  // Check if either value is null or undefined
  if (a == null || b == null) {
    return false;
  }
  // Both values exist, check strict equality
  return a === b;
};

export const validateUserData = (
  user: { email?: string; name?: string; phoneNumber?: string | number } | null,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!user) {
    errors.push('User information is missing');
    return { isValid: false, errors };
  }

  if (!user.name || user.name.trim() === '') {
    errors.push('User name is required');
  }

  if (!user.email || user.email.trim() === '') {
    errors.push('User email is required');
  } else {
    const emailValidationResult = emailValidation(user.email);
    if (emailValidationResult !== true) {
      errors.push(emailValidationResult);
    }
  }

  if (
    !user.phoneNumber ||
    (typeof user.phoneNumber === 'string' && user.phoneNumber.trim() === '')
  ) {
    errors.push('User phone number is required');
  }

  return { isValid: errors.length === 0, errors };
};
