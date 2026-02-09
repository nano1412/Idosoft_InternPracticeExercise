import React, { useState } from "react";
import { useNavigate } from "react-router";

import type { Bill } from "@/components/types";

import FormContent from "@/components/FormContent";
import Container from "@/components/Container";
import ButtonComponent from "@/components/ButtonComponent";
import {
  getMissingFieldsValidation,
  isFormValid,
  type BillFormValidation,
} from "@/components/FormValidation";
import { useAsyncBillStore } from "@/store";
import LoadingModal from "@/components/LoadingModal";
import Modal from "@/components/modal";


const AddBill = () => {
  const isLoading = useAsyncBillStore((s) => s.isLoading);
  const error = useAsyncBillStore((s) => s.error);
  const createBills = useAsyncBillStore((s) => s.createBills);
  const clearError = useAsyncBillStore((s) => s.clearError);
  
  const navigate = useNavigate();
  const [errorField, setErrorField] = useState<BillFormValidation>({
    isShopNameValid: true,
    isDescriptionValid: true,
    isAmountValid: true,
    isDateValid: true,
    isCategoryValid: true,
  });

  const handleAddBill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (isFormValid(formData)) {
      const bill: Bill = {
        shopName: formData.get("shopName") as string,
        description: formData.get("description") as string,
        amount: Number(formData.get("amount")),
        date: formData.get("date") as string,
        category: formData.get("category") as string,
        note: formData.get("note") as string,
      };

      await createBills(bill);
      navigate("/");
    } else {
      setErrorField(getMissingFieldsValidation(formData));
    }
  };

  return (
    <div className="px-15 lg:px-30 ">
      <Container>
        <h1 className="font-bold text-3xl">Add New Bill</h1>
        <FormContent
          {...errorField}
          handleOnSubmit={handleAddBill}
          id={"add-bill-form"}
        />

        <div className="flex justify-start gap-5 ">
          <ButtonComponent
            AdditionalClass="text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => {}}
            type="submit"
            form="add-bill-form"
          >
            Add bill
          </ButtonComponent>
          <ButtonComponent
            AdditionalClass="text-white bg-red-500 hover:bg-red-600"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </ButtonComponent>

        </div>
      </Container>

              {isLoading && (
          <LoadingModal>
            <p>adding new bill to table</p>
          </LoadingModal>
        )}

        {!!error && (
          <Modal
            onClose={() => {
              clearError();
            }}
          >
            <p>{error}</p>
          </Modal>
        )}
    </div>
  );
}
export default AddBill;
