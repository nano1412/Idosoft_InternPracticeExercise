import React, { useState } from "react";
import { useNavigate } from "react-router";

import type { Bill } from "@/pages/components/types";
import { CheckMissingField, isFormValid } from "../components/FormValidation";

import FormContent from "@/pages/components/FormContent";
import Container from "@/pages/components/Container";
import ButtonComponent from "../components/ButtonComponent";
import Modal from "../components/modal";


type Props = {
  setBills: any;
};

function AddBill({ setBills }: Props) {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleAddBill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    if(isFormValid(formData)){
      const bill: Bill = {
      billId: Date.now(),
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
      setErrorText(CheckMissingField(formData))
      setShowError(true);
    }
  };

  return (
    <div className="px-15 lg:px-30">
      <Container>
        <form id="add-bill-form" onSubmit={handleAddBill}>
          <FormContent />
        </form>

        <div className="[&>*:not(:last-child)]:mr-5">
          <ButtonComponent
            AdditionalClass="text-white bg-red-500 hover:bg-red-600"
            onClick={() => {
              navigate("/");
            }}
          >cancel
          </ButtonComponent>

          <ButtonComponent
            AdditionalClass="text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => {}}
            type="submit"
            form="add-bill-form"
          >Add bill
          </ButtonComponent>
        </div>

        {showError && (
          <Modal onClose={() => setShowError(false)}>
            <pre>
              {errorText}
              </pre>
          </Modal>
)}
      </Container>
    </div>
  );
}
export default AddBill;
