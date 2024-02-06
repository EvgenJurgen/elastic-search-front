import React, { useState } from "react";
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

import { useLazyGetSectionsByDataQuery } from "api/sections";
import { useGetTopicsBySectionQuery } from "api/topics";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const GeneratePlan = () => {
  const { t } = useTranslation();

  const [dataForGeneration, setDataForGeneration] = useState("");
  const [dataForGenerationError, setDataForGenerationError] = useState(false);

  const [triggerGetSections, { data: sections }] =
    useLazyGetSectionsByDataQuery();

  const [selectedSectionId, setSelectedSection] = useState("");

  const { data: topics } = useGetTopicsBySectionQuery(selectedSectionId, {
    skip: !selectedSectionId,
  });

  const handleClickGenerateButton = () => {
    try {
      setDataForGenerationError(!dataForGeneration);
      if (dataForGeneration) {
        console.log(dataForGeneration);
        triggerGetSections(dataForGeneration);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickSection = (sectionId: string) => {
    selectedSectionId === sectionId
      ? setSelectedSection("")
      : setSelectedSection(sectionId);
  };

  return (
    <Box className="w-full h-full flex flex-col gap-16 p-10">
      <Box className="w-full flex flex-col gap-10">
        <Typography variant="h3" className="w-full text-center">
          {t("text:get_scientific_information_on_input_data")}
        </Typography>

        <TextField
          multiline
          rows={10}
          value={dataForGeneration}
          error={dataForGenerationError}
          onChange={(e) => {
            setDataForGeneration(e.target.value);
            setDataForGenerationError(false);
          }}
          placeholder={t("placeholder:enter_input_data_for_generation")}
          className="bg-white"
        />

        <Button
          variant="contained"
          className="w-full"
          onClick={handleClickGenerateButton}
        >
          {t("button:generate")}
        </Button>
      </Box>

      <List disablePadding className="flex flex-col gap-2 w-full pb-2">
        {sections?.map((section) => {
          return (
            <ListItem
              disablePadding
              className="w-full min-h-[40px] px-5"
              key={section.id}
              onClick={() => handleClickSection(section.id)}
            >
              <Accordion
                className="w-full h-full"
                expanded={selectedSectionId === section.id}
              >
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                  <Typography variant="h5">{section.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List
                    disablePadding
                    className="flex flex-col gap-2 w-full pl-5"
                  >
                    {topics?.map((topic) => {
                      return (
                        <ListItem disablePadding key={topic.id}>
                          <Typography variant="h6" className="w-full">
                            {topic.title}
                          </Typography>
                        </ListItem>
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
