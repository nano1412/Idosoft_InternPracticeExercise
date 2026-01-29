import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  AdditionalClass?: any;
}

const ButtonComponent = ({
  AdditionalClass = "",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`
        ${AdditionalClass}
        px-6
        py-2
        rounded-lg
        font-medium
        shadow-md
        active:scale-95
        transition
        ease-in-out
        cursor-pointer
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
