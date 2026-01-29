export const BillCategory = {
  FOOD:"food",
  TRANSPORT:"transport",
  RENT:"rent",
  UTILITIES:"utilities",
  ENTERTAINMENT:"entertainment",
}

  export type Bill = {
  billId: any;
  shopName: any;
  description: any;
  amount: any;
  date: any;
  category: any;
  note: any;
};