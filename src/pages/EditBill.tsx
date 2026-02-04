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

const EditBill = () => {
  const bills = useBillStore((state) => state.bills);
  const editBill = useBillStore((state) => state.updateBill);
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

  const GetEditTargetBill = (id: string): Bill | undefined => {
    return bills.find((bill) => bill.billId === id);
  };
  const editBillTarget = GetEditTargetBill(id as string);

  const handleEditBill = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log("editing bill");
    const formData = new FormData(e.currentTarget);
    if (isFormValid(formData)) {
      const updateBill: Bill = {
        billId: id as string,
        shopName: formData.get("shopName") as string,
        description: formData.get("description") as string,
        amount: formData.get("amount") as string,
        date: formData.get("date") as string,
        category: formData.get("category") as string,
        note: formData.get("note") as string,
      };

      editBill(id as string, updateBill);
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

          <div className="flex justify-start gap-5 mx-9">
            <ButtonComponent
              AdditionalClass="text-white bg-red-500 hover:bg-red-600"
              onClick={() => {
                navigate("/");
              }}
            >
              cancel
            </ButtonComponent>

            <ButtonComponent
              AdditionalClass="text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                setEditingConfirmationModalOpen(true);
              }}
            >
              Confirm editing
            </ButtonComponent>
          </div>
        </Container>

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
