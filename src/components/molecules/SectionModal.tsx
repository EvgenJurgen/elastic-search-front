import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

import {
  useDeleteSectionMutation,
  useGetSectionQuery,
  useUpdateSectionMutation,
} from "api/sections";
import { useGetTopicsBySectionQuery } from "api/topics";

import { SectionModalData } from "types";

import TopicModal from "./TopicModal";

import ModalContainer from "components/templates/ModalContainer";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

interface Props {
  open: boolean;
  onClose: any;
  sectionId: string;
  refetchSections: any;
}

const MAX_COUNT_OF_DESCRIPTION_CHARACTERS = 100;

const SectionModal: FC<Props> = ({
  open,
  sectionId,
  refetchSections,
  onClose,
}) => {
  const { t } = useTranslation();

  const [updateSection] = useUpdateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();

  const [savedData, setSavedData] = useState<SectionModalData>({
    title: "",
    topics: [],
  });
  const [data, setData] = useState<SectionModalData>({ title: "", topics: [] });

  const { data: section, refetch: refetchSection } =
    useGetSectionQuery(sectionId);
  const { data: topicsBySection, refetch: refetchTopicsBySection } =
    useGetTopicsBySectionQuery(sectionId);

  useEffect(() => {
    refetchSection();
    refetchTopicsBySection();
  }, [refetchSection, refetchTopicsBySection]);

  useEffect(() => {
    if (section && topicsBySection) {
      setSavedData({ ...section, topics: topicsBySection });
    }
  }, [section, topicsBySection]);

  const [topicId, setTopicId] = useState("");
  const [openTopicModal, setOpenTopicModal] = useState<{
    mode: "view" | "create";
    open: boolean;
  }>({
    mode: "view",
    open: false,
  });

  const [editMode, setEditMode] = useState(false);

  const [titleFieldError, setTitleFieldError] = useState(false);

  useEffect(() => {
    setData(savedData);
  }, [savedData]);

  const handleDeleteSection = async () => {
    try {
      await deleteSection({ id: sectionId });
      refetchSections();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeSectionTitle = (newValue: string) => {
    setTitleFieldError(false);
    setData((prev) => ({ ...prev, title: newValue }));
  };

  const handleDeleteTopic = (topicId: string) => {
    setData((prev) => ({
      ...prev,
      topics: prev.topics.filter((topic) => topic.id !== topicId),
    }));
  };

  const handleSaveChanges = async () => {
    try {
      if (!data.title) {
        setTitleFieldError(true);
        return;
      }

      await updateSection({
        ...data,
        id: sectionId,
        topics: data.topics.map((topic) => topic.id),
      });
      setEditMode(false);
      refetchSection();
      refetchTopicsBySection();
      refetchSections();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelChanges = () => {
    setEditMode(false);
    setData(savedData);
  };

  return (
    <>
      <ModalContainer
        open={open}
        onClose={onClose}
        title={
          editMode
            ? t("title:section_modal_edit_mode")
            : t("title:section_modal_create_mode")
        }
        onEdit={() => setEditMode((prev) => !prev)}
        onDelete={handleDeleteSection}
        onSaveChanges={handleSaveChanges}
        onCancel={handleCancelChanges}
        editMode={editMode}
      >
        {data && (
          <Box className="flex flex-col w-full h-full gap-2">
            {!editMode ? (
              <>
                <Typography variant="h6">{data.title}</Typography>
                <List disablePadding className="flex flex-col gap-2 pl-1">
                  {data.topics.map((topic) => (
                    <ListItem
                      disablePadding
                      className="flex flex-row gap-1 rounded p-1 [&:hover]:bg-[#F4F6FB] cursor-pointer"
                      onClick={() => {
                        setTopicId(topic.id);
                        setOpenTopicModal({ mode: "view", open: true });
                      }}
                      key={topic.id}
                    >
                      <Box className="flex flex-col w-full">
                        <Typography className="w-full font-medium text-sm">
                          {topic.title}
                        </Typography>
                        <Typography className="w-full font-normal text-xs text-[#7f7f7f] text-justify">
                          {topic.description.length <=
                          MAX_COUNT_OF_DESCRIPTION_CHARACTERS
                            ? topic.description
                            : topic.description.slice(0, 100) + "..."}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <>
                <TextField
                  multiline
                  minRows={1}
                  maxRows={3}
                  placeholder={t("placeholder:enter_the_title_field")}
                  value={data.title}
                  onChange={(e) => handleChangeSectionTitle(e.target.value)}
                  error={titleFieldError}
                />

                {data.topics.length ? (
                  <List disablePadding className="flex flex-col">
                    {data.topics.map((topic) => (
                      <ListItem
                        disablePadding
                        key={topic.id}
                        className="flex flex-row justify-between"
                      >
                        <Typography className="w-full font-medium text-sm">
                          {topic.title}
                        </Typography>
                        <IconButton onClick={() => handleDeleteTopic(topic.id)}>
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                ) : null}
              </>
            )}
          </Box>
        )}
      </ModalContainer>
      {openTopicModal.open && (
        <TopicModal
          open={openTopicModal.open}
          mode={openTopicModal.mode}
          topicId={topicId}
          onClose={() => {
            setOpenTopicModal({ mode: "view", open: false });
            setTopicId("");
          }}
        />
      )}
    </>
  );
};
export default SectionModal;
