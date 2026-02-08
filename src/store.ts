import { create } from "zustand";
import type { Bill } from "@/components/types";
import axios from "axios";

const nocodb = axios.create({
  baseURL: `https://app.nocodb.com/api/v2/tables/${import.meta.env.VITE_NOCODB_TABLE_ID}`,
  headers: {
    "xc-token": import.meta.env.VITE_NOCODB_API!,
    "Content-Type": "application/json",
  },
});

type AsyncBillsStore = {
  asyncBills: Bill[]
  
  isLoading: boolean;
  error?: string;
  createBills: (bill: Bill) => void;
  fetchBills: () => Promise<void>;
  updateBill: (billID:number, bill:Bill) => void;
  deleteBills: (billID: number) => Promise<void>;

}

export const useAsyncBillStore = create<AsyncBillsStore>((set) => ({
  asyncBills: [],
  isLoading: false,
  error: undefined,

  createBills: async (bill: Bill) => {
    set({ isLoading: true, error: undefined });

    try {
      await nocodb.post(`/records`, bill);
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
      const res = await nocodb.get(`/records`, {
          params: {
            limit: 1000,
            offset: 0,
          },
        });

      set({ asyncBills: res.data.list, isLoading: false });
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
      await nocodb.patch(
          `/records`,
          {
            Id:billID,
            ...bill
          }
        );
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
      await nocodb.delete(
          `/records`,
          {
            data: { Id: billID },
          });
            const res = await nocodb.get(`/records`, {
          params: {
            limit: 1000,
            offset: 0,
          },
        });
      set({ asyncBills: res.data.list, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message ?? "Failed to fetch users",
        isLoading: false,
      });
    }
  },
}));
