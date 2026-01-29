export const fieldMap: Record<any, any> = {
  shopName: "Shop Name",
  description: "Description",
  category: "Category",
  amount: "Amount",
  date: "Date",
};

export const isFormValid = (form: any) => {

  return Object.keys(fieldMap).every((field) => {
    const value = form.get(field);
    return typeof value === "string" && value.trim().length > 0;
  });
};

export const CheckMissingField = (form: FormData) => {
  let text = "Please enter all the following field(s):\n";

  Object.entries(fieldMap).forEach(([field, label]) => {
    const value = form.get(field);

    if (typeof value !== "string" || value.trim() === "") {
      text += `- ${label}\n`;
    }
  });

  return text;
};