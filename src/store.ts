import { create } from "zustand";
import type { Bill } from "@/components/types";
import {serviceCreateBill, serviceGetBills, serviceUpdateBill, serviceDeleteBill} from "@/service"

type BillsStore = {
  asyncBills: Bill[]
  
  isLoading: boolean;
  error?: string;
  clearError: () => void;
  createBills: (bill: Bill) => void;
  fetchBills: () => Promise<void>;
  updateBill: (billID:number, bill:Bill) => void;
  deleteBills: (billID: number) => Promise<void>;

}

export const useBillStore = create<BillsStore>((set) => ({
  asyncBills: [],
  isLoading: false,
  error: undefined,
  clearError: () => set({ error: undefined }),

  createBills: async (bill: Bill) => {
    set({ isLoading: true, error: undefined });

    try {
      await serviceCreateBill(bill);
      set({ isLoading: false });
    } catch (err: any) {
      set({
        error: err.message ?? "Failed to fetch users",
        isLoading: false,
      });
    }
  },

  fetchBills: async () => {
    set({ isLoading: true, error: undefined });

    try {
      const asyncBills = await serviceGetBills();

      set({ asyncBills, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message ?? "Failed to fetch users",
        isLoading: false,
      });
    }
  },

  updateBill: async (billID, bill) =>{
    set({isLoading:true, error: undefined});

    try {
      await serviceUpdateBill(billID,bill);
      set({isLoading: false });
    } catch (err: any) {
      set({
        error: err.message ?? "Failed to fetch users",
        isLoading: false,
      });
    }
  },

  deleteBills: async (billID) => {
    set({isLoading:true, error: undefined});
    

    try {

          await serviceDeleteBill(billID);
          const asyncBills = await serviceGetBills();
      set({ asyncBills, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message ?? "Failed to fetch users",
        isLoading: false,
      });
    }
  },
}));
