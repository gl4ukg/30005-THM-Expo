export const emailValidation =(email:string):true|string =>{
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return true;
  } else {
    return "Invalid email address. Please enter a valid email in the format: example@example.com";
  }
}

export const passwordRequirements =(password:string):true|string =>{
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
}

export const validatePassword = (newPassword:string, confirmPassword:string):true|string =>{
    if(newPassword !== confirmPassword){
        return "Passwords do not match"
    }
    return true;
}