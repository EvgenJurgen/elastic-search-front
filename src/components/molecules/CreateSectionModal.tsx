import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Typography } from "@mui/material";

import { useCreateSectionMutation } from "api/sections";
import { useGetTopicsQuery } from "api/topics";

import { CreateSectionModalData } from "types";

import ModalContainer from "components/templates/ModalContainer";

import AutocompliteWithSearch from "./AutocompliteWithSearch";

interface Props {
  open: boolean;
  onClose: any;
  refetchSections: any;
}

const CreateSectionModal: FC<Props> = ({ open, onClose, refetchSections }) => {
  const { t } = useTranslation();

  const [createSection] = useCreateSectionMutation();

  const [data, setData] = useState<CreateSectionModalData>({
    title: "",
    topics: [],
    searchTopic: "",
  });

  const { data: topicsByPattern, isLoading } = useGetTopicsQuery(
    {
      pattern: data.searchTopic,
    },
    { skip: !data.searchTopic }
  );

  const [titleFieldError, setTitleFieldError] = useState(false);

  const handleChangeSectionTitle = (newValue: string) => {
    setTitleFieldError(false);
    setData((prev) => ({ ...prev, title: newValue }));
  };

  const handleCreate = async () => {
    try {
      await createSection({
        ...data,
        topics: data.topics.map((topic) => topic.id),
      });
      refetchSections();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      title={t("title:section_modal_create_mode")}
      onCreate={handleCreate}
      onCancel={onClose}
    >
      <TextField
        multiline
        minRows={1}
        maxRows={3}
        placeholder={t("placeholder:enter_the_title_field")}
        value={data.title}
        onChange={(e) => handleChangeSectionTitle(e.target.value)}
        error={titleFieldError}
      />

      <AutocompliteWithSearch
        options={topicsByPattern}
        loading={isLoading}
        selectedOptions={data.topics}
        placeholder={t("placeholder:select_topics")}
        inputValue={data.searchTopic}
        onChangeInputValue={(value) =>
          setData((prev) => ({ ...prev, searchTopic: value }))
        }
        saveOptions={(topics) => {
          setData((prev) => ({ ...prev, topics }));
        }}
        getValue={(option) => option.title}
        getRenderOption={(option) => <Typography>{option.title}</Typography>}
      />
    </ModalContainer>
  );
};

export default CreateSectionModal;
