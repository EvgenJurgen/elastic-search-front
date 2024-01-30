import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const GeneratePlan = () => {
  const { t } = useTranslation();
  return (
    <Box className="w-full h-full flex flex-col gap-16 p-10">
      <Box className="w-full flex flex-col gap-10">
        <Typography variant="h3" className="w-full text-center">
          {t("text:get_scientific_information_on_input_data")}
        </Typography>

        <TextField
          multiline
          minRows={10}
          placeholder={t("placeholder:enter_input_data_for_generation")}
          className="bg-white"
        />

        <Button variant="contained" className="w-full">
          {t("button:generate")}
        </Button>
      </Box>

      <List disablePadding className="flex flex-col gap-2 w-full pb-2">
        {new Array(10).fill(0).map((_, index) => {
          return (
            <ListItem disablePadding className="w-full min-h-[40px] px-5">
              <Accordion className="w-full h-full">
                <AccordionSummary
                  expandIcon={<ExpandMoreRoundedIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>{`Value ${index + 1}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List
                    disablePadding
                    className="flex flex-col gap-2 w-full pl-5"
                  >
                    {new Array(10).fill(0).map((_, index) => {
                      return (
                        <Typography>{`Additionaly value ${index + 1}`}</Typography>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default GeneratePlan;
