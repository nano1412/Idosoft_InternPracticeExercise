import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Bill } from "@/components/types";
import Container from "@/components/Container";
import FormContent from "@/components/FormContent";
import ButtonComponent from "@/components/ButtonComponent";
import {
  getMissingFieldsValidation,
  isFormValid,
  type BillFormValidation,
} from "@/components/FormValidation";
import { useBillStore } from "@/store";
import ConfirmationModal from "@/components/ConfirmationModal";
import LoadingModal from "@/components/LoadingModal";
import Modal from "@/components/modal";
import { PATH } from "@/components/path";

const EditBill = () => {
  const updateBill = useBillStore((s) => s.updateBill);
  const bills = useBillStore((s) => s.asyncBills);
  const isLoading = useBillStore((s) => s.isLoading);
  const error = useBillStore((s) => s.error);
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

  const { id } = useParams();
  const editBillTarget = bills.find((bill) => bill.Id == id);

  const handleEditBill = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (isFormValid(formData)) {
      const updateBillData: Bill = {
        shopName: formData?.get("shopName")?.toString() || "",
        description: formData?.get("description")?.toString() || "",
        amount: Number(formData.get("amount")),
        date: formData?.get("date")?.toString() || "",
        category: formData?.get("category")?.toString() || "",
        note: formData?.get("note")?.toString() || "",
      };

      await updateBill(Number(id), updateBillData);
      navigate(PATH.MANAGE_PAGE);
    } else {
      setErrorField(getMissingFieldsValidation(formData));
    }
  };

  return (
    <>
      <div className="px-15 lg:px-30">
        <Container>
          <h1 className="font-bold text-3xl">Edit Bill ID: {id}</h1>
          <FormContent
            {...errorField}
            {...editBillTarget}
            handleOnSubmit={handleEditBill}
            id={"edit-bill-form"}
          />

          <div className="flex justify-start gap-5 ">

            <ButtonComponent
              AdditionalClass="text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                setEditingConfirmationModalOpen(true);
              }}
            >
              Save
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
          <LoadingModal text="updating table"/>

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
                "edit-bill-form",
              ) as HTMLFormElement | null;
              form?.requestSubmit();
              setEditingConfirmationModalOpen(false);
            }}
          >
            <p>confirm editing this bill</p>
          </ConfirmationModal>
        )}
      </div>
    </>
  );
};

export default EditBill;
