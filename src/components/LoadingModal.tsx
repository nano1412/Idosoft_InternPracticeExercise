import type React from "react";

type ContainerProps = {
  text: string;
};


const LoadingModal:React.FC<ContainerProps>  =({ text }) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <div className=" flex flex-col items-center text-white font-bold text-2xl">
                    <div className="m-2 w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

                    <p>{text}</p>
                </div>
            </div>
        </>
    )
}

export default LoadingModal