
export type BillFormValidation = {
  isShopNameValid: boolean;
  isDescriptionValid: boolean;
  isAmountValid: boolean;
  isDateValid: boolean;
  isCategoryValid: boolean;
};

export const fieldMap: Record<string, string> = {
  shopName: "Shop Name",
  description: "Description",
  category: "Category",
  amount: "Amount",
  date: "Date",
};

export const isFormValid = (form: FormData): boolean => {
  return Object.keys(fieldMap).every((field) => {
    const value = form.get(field);
    return typeof value === "string" && value.trim().length > 0;
  });
};

export const getMissingFieldsValidation = (
  form: FormData,
): BillFormValidation => {
  return {
    isShopNameValid: isNonEmptyString(form.get("shopName") as string),
    isDescriptionValid: isNonEmptyString(form.get("description") as string),
    isAmountValid: isNonEmptyString(form.get("amount") as string),
    isDateValid: isNonEmptyString(form.get("date") as string),
    isCategoryValid: isNonEmptyString(form.get("category") as string),
  };
};

const isNonEmptyString = (value: string): boolean => {
  return typeof value === "string" && value.trim() !== "";
};