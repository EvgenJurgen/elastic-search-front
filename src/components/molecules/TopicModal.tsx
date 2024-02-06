import React, { FC, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ModalContainer from "components/templates/ModalContainer";
import { useGetTopicQuery } from "api/topics";
import { Topic } from "api/topics/types";

interface Props {
  open: boolean;
  mode: "view" | "create";
  topicId?: string;
  onClose?: any;
}

const TopicModal: FC<Props> = ({ open, mode, topicId, onClose }) => {
  const { t } = useTranslation();

  const [data, setData] = useState<Omit<Topic, "id">>({
    title: "",
    description: "",
  });

  const { data: topic } = useGetTopicQuery(topicId as string, {
    skip: !topicId,
  });

  useEffect(() => {
    topic && setData(topic);
  }, [topic]);

  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      title={
        mode === "view"
          ? t("title:topic_modal_view_mode")
          : mode === "create"
            ? t("title:topic_modal_create_mode")
            : mode === "edit"
              ? t("title:topic_modal_edit_mode")
              : undefined
      }
    >
      {data && (
        <Box className="flex flex-col w-full h-full gap-2">
          {mode === "view" ? (
            <>
              <Typography variant="h6">{data.title}</Typography>
              <Typography className="font-medium text-sm text-justify">
                {data.description}
              </Typography>
            </>
          ) : (
            <></>
          )}
        </Box>
      )}
    </ModalContainer>
  );
};

export default TopicModal;
