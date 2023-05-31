import { Box, HStack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const ListItem1 = ({ user }) => {
  const { id, name, username } = user;
  return (
    <Box w={"100%"} p={2} border={"1px"} borderColor="gray.300">
      <HStack spacing={"10px"}>
        <Text as="b">User ID:</Text>
        <Text noOfLines={1}>{id}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Name:</Text>
        <Text color={"purple.500"}>{name}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Username:</Text>
        <Text color={"tomato"}>{username}</Text>
      </HStack>
    </Box>
  );
};

export const ListItem2 = ({ user }) => {
  const { phone, website, email } = user;
  return (
    <Box w={"100%"} p={2} border={"1px"} borderColor="gray.300">
      <HStack spacing={"10px"}>
        <Text as="b">Phone:</Text>
        <Text noOfLines={1}>{phone}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Website:</Text>
        <Text color={"purple.500"}>{website}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Email:</Text>
        <Text color={"tomato"}>{email}</Text>
      </HStack>
    </Box>
  );
};

ListItem1.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
  }),
};

ListItem2.propTypes = {
  user: PropTypes.shape({
    phone: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
  }),
};
