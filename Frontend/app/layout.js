import "./globals.css";
import Header from "../Component/Navbar/NormNavbar.jsx";
import Footer from "./Footer/page";
import Script from "next/script";

export const metadata = {
  title: "SDMC",
  icons: {
    icon: [
      { url: "/original.jpg" },
      { url: "/removed.png" }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>

        {/* Google Analytics 4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0LKX1E124Y"
        />

        <Script id="ga4-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0LKX1E124Y');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wem0trdlp9");
          `}
        </Script>

      </head>

      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}