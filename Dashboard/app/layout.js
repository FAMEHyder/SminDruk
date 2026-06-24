import Header from "./header/page.jsx";
import Sidebar from "./Sidebar/page.jsx";
import { Box, Typography } from '@mui/material';
import "./layout.css"

export const metadata = {
  title: "SDMC Dashboard",
  icons:{
    icon:[
      {url:'/orignal.jpg'},
      {url:'/removed.png'}
    ]
  }
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Header />

        <Box display={'flex'} mt={4}>

          {/* To adjust the side bar  */}
          <Box>
            <Sidebar />
          </Box>


          {/* The main component */}

          <Box width={'100%'} ml={32} mt={2}>
            {children}</Box>

        </Box>

        
      </body>
    </html>
  );
}
