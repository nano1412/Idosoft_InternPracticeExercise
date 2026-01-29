import { type ReactNode } from "react"

type ContainerProps = {
  children: any
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="col-start-3 row-start-3 flex flex-col rounded-xl bg-white p-10 text-sm/7 text-gray-700 overflow-x-auto ">
      {children}
    </div>
  )
}

export default Container