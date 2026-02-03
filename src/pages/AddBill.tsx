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

type Props = {
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
};

function AddBill({ setBills }: Props) {
  const navigate = useNavigate();
  const [errorField, setErrorField] = useState<BillFormValidation>({
    isShopNameValid: true,
    isDescriptionValid: true,
    isAmountValid: true,
    isDateValid: true,
    isCategoryValid: true,
  });

  const handleAddBill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (isFormValid(formData)) {
      const bill: Bill = {
        billId: Date.now().toString(),
        shopName: formData.get("shopName") as string,
        description: formData.get("description") as string,
        amount: formData.get("amount") as string,
        date: formData.get("date") as string,
        category: formData.get("category") as string,
        note: formData.get("note") as string,
      };

      setBills((prev: Bill[]) => [...prev, bill]);
      navigate("/");
    } else {
      setErrorField(getMissingFieldsValidation(formData));
    }
  };

  return (
    <div className="px-15 lg:px-30 ">
      <Container>
        <FormContent
          {...errorField}
          handleOnSubmit={handleAddBill}
          id={"add-bill-form"}
        />

        <div className="flex sm:max-w-100">
          <ButtonComponent
            AdditionalClass="text-white bg-red-500 hover:bg-red-600 mr-5 mb-5 sm:mb-0"
            onClick={() => {
              navigate("/");
            }}
          >
            cancel
          </ButtonComponent>

          <ButtonComponent
            AdditionalClass="text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => {}}
            type="submit"
            form="add-bill-form"
          >
            Add bill
          </ButtonComponent>
        </div>
      </Container>
    </div>
  );
}
export default AddBill;
