import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Bill } from "@/pages/components/types";
import Container from "@/pages/components/Container";
import FormContent, {
  getMissingFieldsValidation,
  isFormValid,
  type BillFormValidation,
} from "@/pages/components/FormContent";
import ButtonComponent from "@/pages/components/ButtonComponent";

type Props = {
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
};

const EditBill: React.FC<Props> = ({ bills, setBills }) => {
  const navigate = useNavigate();
  const [errorField, setErrorField] = useState<BillFormValidation>({
    isShopNameValid: true,
    isDescriptionValid: true,
    isAmountValid: true,
    isDateValid: true,
    isCategoryValid: true,
  });

  const { id } = useParams();

  const GetEditTargetBill = (id: string):Bill | undefined => {
    return bills.find((bill) => bill.billId === id);
  };
  const editBillTarget = GetEditTargetBill(id as string);

  const handleEditBill = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();

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

      setBills((prev: Bill[]) =>
        prev.map((bill) =>
          bill.billId === id ? { ...bill, ...updateBill } : bill,
        ),
      );
      navigate("/");
    } else {
      setErrorField(getMissingFieldsValidation(formData));
    }
  };

  return (
    <>
      <div className="px-15 lg:px-30">
        <Container>
          <FormContent
            {...errorField}
            {...editBillTarget}
            handleOnSubmit={handleEditBill}
            id={"edit-bill-form"}
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
              form="edit-bill-form"
            >
              Edit bill: {id}
            </ButtonComponent>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EditBill;
