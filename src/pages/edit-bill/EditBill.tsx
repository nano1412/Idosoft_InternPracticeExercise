import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Bill } from "../components/types";
import Container from "../components/Container";
import FormContent, { getFormValidationMessage, getMissingFieldsValidation, isFormValid, type BillFormValidation } from "../components/FormContent";
import ButtonComponent from "../components/ButtonComponent";
import Modal from "../components/modal";

type Props = {
  bills: Bill[];
  setBills: any;
};

function EditBill({ bills, setBills }: Props) {
  console.log(bills)
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
    const [errorField, setErrorField] = useState<BillFormValidation>({isShopNameValid: true,
    isDescriptionValid: true,
    isAmountValid: true,
    isDateValid: true,
    isCategoryValid: true
  });

  const { id } = useParams();
  
  const GetEditTargetBill = (id:any) => {
    return bills.find(bill => bill.billId === id);
  }
  const editBillTarget = GetEditTargetBill(id);

  const handleEditBill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (isFormValid(formData)) {
      const updateBill: Bill = {
        billId: id,
        shopName: formData.get("shopName") as string,
        description: formData.get("description") as string,
        amount: formData.get("amount") as string,
        date: formData.get("date") as string,
        category: formData.get("category") as string,
        note: formData.get("note") as string,
      };

      setBills((prev: Bill[]) => prev.map(bill =>
      bill.billId === id ? { ...bill, ...updateBill } : bill
    ));
      navigate("/");
    } else {
      setErrorField(getMissingFieldsValidation(formData));
      setErrorText(getFormValidationMessage(formData));
      setShowError(true);
    }
  };

  return (
    <>
      <div className="px-15 lg:px-30">
        <Container>
            <FormContent {...errorField} {...editBillTarget} handleOnSubmit = {handleEditBill} id ={"edit-bill-form"} />

          <div className="flex sm:max-w-100">
            <ButtonComponent
              AdditionalClass="text-white bg-red-500 hover:bg-red-600 mr-5 mb-5 sm:mb-0"
              onClick={() => {
                navigate("/");
              }}>
              cancel
            </ButtonComponent>

            <ButtonComponent
              AdditionalClass="text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => {}}
              type="submit"
              form="edit-bill-form">
              Edit bill: {id}
            </ButtonComponent>
          </div>

          {/* {showError && (
            <Modal onClose={() => setShowError(false)}>
              <pre>{errorText}</pre>
            </Modal>
          )} */}
        </Container>
      </div>
    </>
  );
}

export default EditBill;
