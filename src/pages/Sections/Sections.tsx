import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import { useGetSectionsQuery } from "api/sections";

import GridItem from "components/molecules/GridItem";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SectionModal from "components/molecules/SectionModal";
import CreateSectionModal from "components/molecules/CreateSectionModal";

const Sections = () => {
  const { data: sections, refetch } = useGetSectionsQuery();

  const [sectionId, setSectionId] = useState("");
  const [openSectionModal, setOpenSectionModal] = useState<{
    mode: "view" | "create";
    open: boolean;
  }>({
    mode: "view",
    open: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <Grid container spacing={2} className="p-10">
        <GridItem
          onClick={() =>
            setOpenSectionModal({
              mode: "create",
              open: true,
            })
          }
          key={"add_new_section"}
        >
          {<AddRoundedIcon />}
        </GridItem>

        {sections?.map((section) => (
          <GridItem
            onClick={() => {
              setOpenSectionModal({
                mode: "view",
                open: true,
              });
              setSectionId(section.id);
            }}
            key={section.id}
          >
            <Typography variant="h6" className="w-full text-center">
              {section.title}
            </Typography>
          </GridItem>
        ))}
      </Grid>

      {openSectionModal.open && openSectionModal.mode === "view" && (
        <SectionModal
          open={openSectionModal.open}
          sectionId={sectionId}
          refetchSections={refetch}
          onClose={() => {
            setOpenSectionModal({ mode: "view", open: false });
            setSectionId("");
          }}
        />
      )}

      {openSectionModal.open && openSectionModal.mode === "create" && (
        <CreateSectionModal
          open={openSectionModal.open}
          onClose={() => setOpenSectionModal({ mode: "view", open: false })}
          refetchSections={refetch}
        />
      )}
    </>
  );
};

export default Sections;
