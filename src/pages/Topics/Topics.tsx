import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import GridItem from "components/molecules/GridItem";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useGetTopicsQuery } from "api/topics";
import TopicModal from "components/molecules/TopicModal";
import CreateTopicModal from "components/molecules/CreateTopicModal";

const Topics = () => {
  const { data: topics, refetch } = useGetTopicsQuery();

  const [topicId, setTopicId] = useState("");
  const [openTopicModal, setOpenTopicModal] = useState<{
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
            setOpenTopicModal({
              mode: "create",
              open: true,
            })
          }
          key={"add_new_topic"}
        >
          {<AddRoundedIcon />}
        </GridItem>

        {topics?.map((topic) => (
          <GridItem
            onClick={() => {
              setOpenTopicModal({
                mode: "view",
                open: true,
              });
              setTopicId(topic.id);
            }}
            key={topic.id}
          >
            <Typography variant="h6" className="w-full text-center">
              {topic.title}
            </Typography>
          </GridItem>
        ))}
      </Grid>

      {openTopicModal.open && openTopicModal.mode === "view" && (
        <TopicModal
          open={openTopicModal.open}
          topicId={topicId}
          refetchTopics={refetch}
          onClose={() => {
            setOpenTopicModal({ mode: "view", open: false });
            setTopicId("");
          }}
        />
      )}

      {openTopicModal.open && openTopicModal.mode === "create" && (
        <CreateTopicModal
          open={openTopicModal.open}
          onClose={() => setOpenTopicModal({ mode: "view", open: false })}
          refetchTopics={refetch}
        />
      )}
    </>
  );
};

export default Topics;
