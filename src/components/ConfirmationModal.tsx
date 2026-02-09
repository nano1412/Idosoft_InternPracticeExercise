import ButtonComponent from "@/components/ButtonComponent";

type ConfirmationModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;

  cancelButtonAdditionalClass:string;
  confirmButtonAdditionalClass:string;
}

const ConfirmationModal:React.FC<ConfirmationModalProps> = ({ onClose, onConfirm, children,cancelButtonAdditionalClass,confirmButtonAdditionalClass }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded shadow-lg text-center space-y-4">
          <div className="text-black font-semibold">{children}</div>

          <div className="[&>*:not(:last-child)]:mr-5">
            <ButtonComponent
              AdditionalClass={cancelButtonAdditionalClass}
              onClick={onClose}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              AdditionalClass={confirmButtonAdditionalClass}
              onClick={onConfirm}
            >
              Confirm
            </ButtonComponent>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationModal;
