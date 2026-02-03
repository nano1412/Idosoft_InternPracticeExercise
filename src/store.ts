import { create } from "zustand";
import type { Bill } from "@/components/types";

type BillStore = {
  bills: Bill[];
  createBill: (bill: Bill) => void;
  updateBill: (billId: string, updates: Partial<Bill>) => void;
  deleteBill: (billId: string) => void;
};

export const useBillStore = create<BillStore>((set) => ({
  bills: [],

  createBill: (bill) =>
    set((state) => ({
      bills: [...state.bills, bill],
    })),

  updateBill: (billId, updates) =>
    set((state) => ({
      bills: state.bills.map((bill) =>
        bill.billId === billId ? { ...bill, ...updates } : bill,
      ),
    })),

  deleteBill: (billId) =>
    set((state) => ({
      bills: state.bills.filter((b) => b.billId !== billId),
    })),
}));
