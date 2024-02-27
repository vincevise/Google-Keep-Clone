
import NavBar from "@/components/Bar/NavBar";
import Sidebar from "@/components/Bar/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SignInButton, useUser, redirectToSignUp } from "@clerk/nextjs";
import { Inter as FontSans } from "next/font/google";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

type Props = {
    children: ReactNode
}

export default function AppLayout({children}:Props) {

  const user = useUser();
  const [openSideBar, setOpenSideBar] = useState(false);

  const router = useRouter();

  console.log(router, 'router');
  


  return (
    <>
     


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
                  <NavBar setOpenSideBar={setOpenSideBar}/>
                  <div className="flex h-full  ">

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
            <>
              <SignInButton >Sign in</SignInButton>
            </>
        }
      </div>

      {/* {user.user} */}

    </>
  );
}
