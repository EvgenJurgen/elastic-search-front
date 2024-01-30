import React, { FC, ReactNode } from "react";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }: any) => {
  return (
    <Box>
      <Box className="flex w-full h-full">
        {/* <Header/> */}

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: `calc(100vh - ${40}px)`,
            top: "40px",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
