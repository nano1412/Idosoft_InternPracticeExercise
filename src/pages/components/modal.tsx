import { type ReactNode } from "react";
import ButtonComponent from "@/pages/components/ButtonComponent";

type PopupProps = {
    onClose:any
  children: ReactNode
}

function Modal({onClose, children}:PopupProps) {
  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-lg text-left space-y-4">
            <div className="text-red-600 font-semibold">
              {children}
            </div>

            <ButtonComponent
            AdditionalClass="bg-blue-600 text-white"
            children="OK"
            onClick={onClose}
          />
          </div>
        </div>
    </>
  );
}

export default Modal;
