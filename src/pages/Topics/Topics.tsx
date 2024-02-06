import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import GridItem from "components/molecules/GridItem";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useGetTopicsQuery } from "api/topics";

const Topics = () => {
  const { data: topics, refetch } = useGetTopicsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Grid container spacing={2} className="p-10">
      <GridItem>{<AddRoundedIcon />}</GridItem>

      {topics?.map((topic) => (
        <GridItem>
          <Typography variant="h6" className="w-full text-center">
            {topic.title}
          </Typography>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Topics;
