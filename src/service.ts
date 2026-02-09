import axios, { AxiosError } from "axios";
import type { Bill } from "@/components/types";

export const service = axios.create({
  baseURL: `https://app.nocodb.com/api/v2/tables/${import.meta.env.VITE_NOCODB_TABLE_ID}`,
  headers: {
    "xc-token": import.meta.env.VITE_NOCODB_API!,
    "Content-Type": "application/json",
  },
});

export async function serviceGetBills(): Promise<Bill[]> {
  const res = await service.get(`/records`, {
    params: {
      limit: 1000,
      offset: 0,
    },
  });

  return res.data.list;
}

export async function serviceCreateBill(
  data: Bill
) {
  const res = await service.post(
    `/records`,
    data
  );

  return res.data;
}

export async function serviceUpdateBill(
  rowId: number,
  data: Partial<Bill>
) {
  const res = await service.patch(
    `/records`,
    {
      billId:rowId,
      ...data
    }
  );

  return res.data;
}

export async function serviceDeleteBill(
  rowId: number
) {
  await service.delete(
    `/records`,
    {
      data: { Id: rowId },
    }
  );
}

service.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error("NocoDB API Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("NocoDB Network Error:", error.message);
    } else {
      console.error("NocoDB Unknown Error:", error.message);
    }

    return Promise.reject(error);
  }
);