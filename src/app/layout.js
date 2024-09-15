import { Roboto } from "next/font/google";
import Navbar from "./component/navbar";
import "./globals.css";
import { AppWrapper } from "./context/contextApi";
import toast, { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import Footer from "./component/footer";

const roboto = Roboto({ subsets: ["latin"],weight:["400", "500", "700", "900"] });

export const metadata = {
  title: "Dawid ST Pizza ",
  description: "Every thing is better with pizza",
  icons : {
  icon : ['/logo.jpg']

  }
};

{/* <link rel="icon" sizes="512x512" href="/logo.jpg" type="image/ico" /> */}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppWrapper>
          <Toaster />
          <NextTopLoader
            color="#f8341e"
            height={2.34}
            crawlSpeed={400}
            showSpinner={false}
            speed={700}
            showAtBottom={false}
          />
          <Navbar/>
          {children}
          <Footer/>
        </AppWrapper>
      </body>
    </html>
  );
}
