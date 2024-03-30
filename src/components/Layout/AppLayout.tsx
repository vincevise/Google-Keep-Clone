
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SignInButton, useUser, redirectToSignUp } from "@clerk/nextjs";
import { Inter as FontSans } from "next/font/google";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import Landingpage from "../Landingpage";
import NextProgress from 'nextjs-progressbar'
import { useTheme } from "next-themes";
import LoadingPage from "../LoadingPage";


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

type Props = {
    children: ReactNode
}

interface GridContextType {
  isGrid: boolean,
  setIsGrid: Dispatch<SetStateAction<boolean>>, 
}

export const GridContext = createContext<GridContextType | undefined>(undefined)


const GridContextProvider = ({children}: any) =>{
  const [isGrid, setIsGrid] = useState(true)



  return(
    <GridContext.Provider value={{isGrid, setIsGrid }}>
      {children}
    </GridContext.Provider>
  )
}
 

export const useGrid = () => {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error('useGrid must be used within a GridContextProvider');
  }
  return {
    isGrid: context.isGrid,
    setIsGrid: context.setIsGrid,
  }

}

export default function AppLayout({children}:Props) {

  const user = useUser();
  const [openSideBar, setOpenSideBar] = useState(false);

  const router = useRouter();

  console.log(router, 'router');
  const { setTheme, theme } = useTheme();
  

  console.log(user.isLoaded, 'user.isLoaded')
  if(!user.isLoaded){
    return (<div>
        <LoadingPage/>
    </div>
      )
  }
  return (
    <>
     

     <GridContextProvider>
      <div className={cn(
                  "min-h-screen bg-background font-sans antialiased",
                  fontSans.variable
                )}>
        {
          user.isSignedIn
            ?
            (
              <>
                <main className="" >
                  
                    <NavBar setOpenSideBar={setOpenSideBar}  />
                    <NextProgress/> 
                    <div className={`flex h-full bg-background_secondary `}>

                        <Sidebar openSideBar={openSideBar}/>
                        {/* main content */}
                        <div className={`w-full max-w-6xl mx-auto h-fit px-4 pt-20   `}>
                              <TooltipProvider>
                                {children}
                              </TooltipProvider>
                        </div>
                    </div>
                  
               

                </main>

              </>
            )
            :
            <div className="w-screen h-screen ">
               <Landingpage/>
              
            </div>
        }
      </div>
      </GridContextProvider>
      {/* {user.user} */}

    </>
  );
}
