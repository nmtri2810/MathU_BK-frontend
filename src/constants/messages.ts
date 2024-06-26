export const MessagesValidate = {
  isRequired: (fieldName: string) => `${fieldName} is required`,
  invalidData: (fieldName: string, reason?: string) => {
    const defaultMsg = `${fieldName} is not valid`;
    if (!reason) return defaultMsg;

    return `${defaultMsg}. ${reason}`;
  },
  maxLength: (fieldName: string, length: number) => `${fieldName} must be less than ${length} characters`,
  minLength: (fieldName: string, length: number) => `${fieldName} must be more than ${length} characters`
};
