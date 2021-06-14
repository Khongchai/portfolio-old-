import { Img, Link } from "@chakra-ui/react";
import React from "react";

const GithubLink: React.FC<{ githubLink: string }> = ({ githubLink }) => {
  if (githubLink) {
    return (
      <Link
        _hover={{ opacity: "1" }}
        opacity="0.7"
        href={githubLink}
        isExternal={true}
        filter="invert(1)"
        id="github-link"
      >
        <Img w="1.7rem" h="1.7rem" src="/logos/github.png" opacity="0.4" />
      </Link>
    );
  }
  return <div>Repo not available</div>;
};

export default GithubLink;
