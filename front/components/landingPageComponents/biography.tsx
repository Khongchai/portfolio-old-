import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface biographyProps {}

export const Biography: React.FC<biographyProps> = ({}) => {
  return (
    <Stack
      spacing={6}
      gridRow="2"
      id="biography"
      gridColumn="main-content-start / main-content-end "
      p="2rem"
    >
      <Heading color="mainOrange" as="h2">
        Hi, I'm Khong
      </Heading>
      <Text>
        I'm a web dev, and I'm interested in ALL SORTS of stuff; I love
        creating, learning, and solving problems! My current focus is mostly on
        architecting and understanding the entire process of getting a project
        from the ground to the moon. This portfolio, for example, has several
        components coded from scratch; its admin interface, the animations,
        linking backend to redis -- you name it!
      </Text>
      <Text>
        My focus is neither on the backend nor frontend; I do them because they
        are a part of the process that I need to do to achieve my goals.
        However, just between you and me, I really dig frontend stuff,
        especially animations!
      </Text>
      <Text>
        My projects range from an interactive binaural music application for
        Android (Java) to an e-commerce website (in progress) where I sell my
        music (I'm also a composer, you see). Other than the necessary
        frameworks I already need to learn in order to build my applications,
        other stuff that I'm also learning are Calculus, Linear Algebra,
        threeJS, and Go.
      </Text>
      <Text fontWeight="bold" color="mainOrange">
        So I’m doing so many things all at once, what then, you may be asking,
        is my passion? Learning!
      </Text>
    </Stack>
  );
};
