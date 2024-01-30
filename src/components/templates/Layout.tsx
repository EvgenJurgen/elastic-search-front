import React, { FC, ReactNode } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";

import { paths } from "app/constant";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const bottomNavigationHeight = "56px";

const Layout: FC<Props> = ({ children }: any) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box className="flex w-full h-full">
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: `calc(100vh - ${bottomNavigationHeight})`,
          overflow: "auto",
          backgroundColor: "#F4F6FB",
        }}
      >
        {children}
      </Box>
      <Paper
        className={
          "fixed bottom-0 inset-x-0 " + `h-[${bottomNavigationHeight}]`
        }
        elevation={2}
      >
        <BottomNavigation
          showLabels
          value={pathname}
          onChange={(event, newValue) => {
            navigate(newValue);
          }}
          className="h-full"
        >
          <BottomNavigationAction
            icon={<HomeRoundedIcon />}
            value={paths.generatePlan}
          />
          <BottomNavigationAction
            icon={<TopicRoundedIcon />}
            value={paths.sections}
          />
          <BottomNavigationAction
            icon={<LibraryBooksRoundedIcon />}
            value={paths.topics}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Layout;
