import Header from "@/components/Header"
import SideBar from "@/components/SideBar"
import { ReactNode } from "react"

const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex flex-1 justify-between ">
        {children}
        <SideBar />
      </div>
    </div>
  )
}

export default MainLayout