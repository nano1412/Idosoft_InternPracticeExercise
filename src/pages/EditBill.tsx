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
import { useAsyncBillStore } from "@/store";
import ConfirmationModal from "@/components/ConfirmationModal";
import LoadingModal from "@/components/LoadingModal";
import Modal from "@/components/modal";

const EditBill = () => {
  const updateBill = useAsyncBillStore((s) => s.updateBill);
  const asyncBills = useAsyncBillStore((s) => s.asyncBills);
  const isLoading = useAsyncBillStore((s) => s.isLoading);
  const error = useAsyncBillStore((s) => s.error);
  const clearError = useAsyncBillStore((s) => s.clearError);

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

  const GetEditTargetBill = (id: number): Bill | undefined => {
    return asyncBills.find((bill) => bill.Id === id);
  };
  const editBillTarget = GetEditTargetBill(Number(id));

  const handleEditBill = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    console.log("editing bill");
    const formData = new FormData(e.currentTarget);
    if (isFormValid(formData)) {
      const updateBilldata: Bill = {
        shopName: formData.get("shopName") as string,
        description: formData.get("description") as string,
        amount: Number(formData.get("amount")),
        date: formData.get("date") as string,
        category: formData.get("category") as string,
        note: formData.get("note") as string,
      };

      await updateBill(Number(id), updateBilldata);
      navigate("/");
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

          <div className="flex justify-center gap-5 mx-9">
            <ButtonComponent
              AdditionalClass="text-white bg-red-500 hover:bg-red-600"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              AdditionalClass="text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                setEditingConfirmationModalOpen(true);
              }}
            >
              Save
            </ButtonComponent>
          </div>
        </Container>

        {isLoading && (
          <LoadingModal>
            <p>updating table</p>
          </LoadingModal>
        )}

        {error != undefined && (
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
            <p>confirm editing bill: {id}</p>
          </ConfirmationModal>
        )}
      </div>
    </>
  );
};

export default EditBill;
