export const BillCategory = {
  FOOD:"food",
  TRANSPORT:"transport",
  RENT:"rent",
  UTILITIES:"utilities",
  ENTERTAINMENT:"entertainment",
}

  export type Bill = {
  billId: string;
  shopName: string;
  description: string;
  amount: string;
  date: string;
  category: string;
  note: string;
};