import type { NextPage } from "next";
import { Box, chakra } from "@chakra-ui/react";
import React from "react";

const Home: NextPage = () => {
  return (
    <Box>
      <chakra.h1 color="tomato">Hello World!</chakra.h1>
    </Box>
  );
};

export default Home;
