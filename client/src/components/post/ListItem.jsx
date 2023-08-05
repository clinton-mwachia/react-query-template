import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

export const ListComments = ({ comments }) => {
  const { id, name, body, email } = comments || {};
  return (
    <Box
      w={"100%"}
      p={2}
      border={"1px"}
      borderColor="gray.300"
      position={"relative"}
    >
      <Box position={"relative"} zIndex={1}>
        <HStack spacing={"10px"}>
          <Text as="b">email:</Text>
          <Text color={"tomato"}>{email}</Text>
        </HStack>
        <HStack spacing={"10px"}>
          <Text as="b">Name:</Text>
          <Text color={"purple.500"} noOfLines={2}>
            {name}
          </Text>
        </HStack>
        <HStack spacing={"10px"}>
          <Text as="b">Body:</Text>
          <Text noOfLines={2}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </Text>
        </HStack>
      </Box>

      <Badge
        position={"absolute"}
        backgroundColor={"teal.300"}
        transform="translateX(-50%)"
        zIndex={2}
        top={"-10px"}
        left={"50%"}
        px={2}
      >
        Comment - {id}
      </Badge>
    </Box>
  );
};

ListComments.propTypes = {
  comments: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }),
};
