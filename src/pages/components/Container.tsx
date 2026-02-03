import type React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="col-start-3 row-start-3 flex flex-col rounded-xl bg-white p-5 text-sm/7 text-gray-700 overflow-x-auto drop-shadow-xl">
      {children}
    </div>
  );
};

export default Container;
