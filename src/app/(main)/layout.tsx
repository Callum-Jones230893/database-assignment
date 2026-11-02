import Header from "@/components/Header"
import { ReactNode } from "react"

const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex flex-1 justify-between ">
        {children}
      </div>
    </div>
  )
}

export default MainLayout