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
import { useBillStore } from "@/store";
import LoadingModal from "@/components/LoadingModal";
import Modal from "@/components/modal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { PATH } from "@/components/path";


const AddBill = () => {
  const isLoading = useBillStore((s) => s.isLoading);
  const error = useBillStore((s) => s.error);
  const createBills = useBillStore((s) => s.createBills);
  const clearError = useBillStore((s) => s.clearError);

   const [isModalOpen, setEditingConfirmationModalOpen] = useState(false);
  
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
        billId: Date.now(),
        shopName: formData?.get("shopName")?.toString() || "",
        description: formData?.get("description")?.toString() || "",
        amount: Number(formData.get("amount")),
        date: formData?.get("date")?.toString() || "",
        category: formData?.get("category")?.toString() || "",
        note: formData?.get("note")?.toString() || "",
      };

      await createBills(bill);
      navigate(PATH.MANAGE_PAGE);
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
            onClick={() => {setEditingConfirmationModalOpen(true);}}
          >
            Add bill
          </ButtonComponent>
          <ButtonComponent
            AdditionalClass="text-white bg-red-500 hover:bg-red-600"
            onClick={() => {
              navigate(PATH.MANAGE_PAGE);
            }}
          >
            Cancel
          </ButtonComponent>

        </div>
      </Container>

              {isLoading && (
          <LoadingModal loadingMessage="adding new bill to table"/>
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

        {isModalOpen && (
          <ConfirmationModal
            onClose={() => setEditingConfirmationModalOpen(false)}
            onConfirm={() => {
              const form = document.getElementById(
                "add-bill-form",
              ) as HTMLFormElement | null;
              form?.requestSubmit();
              setEditingConfirmationModalOpen(false);
            }}
          >
            <p>confirm adding this bill</p>
          </ConfirmationModal>
        )}
    </div>
  );
}
export default AddBill;
