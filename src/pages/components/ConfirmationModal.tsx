import { useState, type ReactNode } from "react";
import ButtonComponent from "./ButtonComponent";

type PopupProps = {
  onClose: any;
  onConfirm: any;
  children: any;
};

function ConfirmationModal({ onClose, onConfirm, children }: PopupProps) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded shadow-lg text-center space-y-4">
          <div className="text-red-600 font-semibold">{children}</div>
    
    <div className="[&>*:not(:last-child)]:mr-5">
          <ButtonComponent
            AdditionalClass="bg-blue-600 text-white"
            children="Cancel"
            onClick={onClose}
            />

          <ButtonComponent
            AdditionalClass="bg-red-600 text-white"
            children="Confirm"
            onClick={onConfirm}
            />
        </div>
      </div>
    </div>
    </>
  );
}

export default ConfirmationModal;
