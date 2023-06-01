import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const ListItem1 = ({ user }) => {
  const { id, name, username } = user;
  return (
    <Box w={"100%"} p={2} border={"1px"} borderColor="gray.300">
      <HStack spacing={"10px"}>
        <Text as="b">Name:</Text>
        <Text color={"purple.500"}>{name}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">User ID:</Text>
        <Text noOfLines={1}>{id}</Text>
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
        <Text as="b">Email:</Text>
        <Text color={"tomato"}>{email}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Phone:</Text>
        <Text noOfLines={1}>{phone}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Website:</Text>
        <Text color={"purple.500"}>{website}</Text>
      </HStack>
    </Box>
  );
};

export const Company = ({ user }) => {
  const { name, catchPhrase, bs } = user.company;
  return (
    <Box w={"100%"} p={2} border={"1px"} borderColor="gray.300">
      <HStack spacing={"10px"}>
        <Text as="b">Bs:</Text>
        <Text color={"blue.500"}>{bs}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Name:</Text>
        <Text noOfLines={1} color={"blue.500"}>
          {name}
        </Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">CatchPhrase:</Text>
        <Text color={"blue.500"}>{catchPhrase}</Text>
      </HStack>
    </Box>
  );
};

export const Address = ({ user }) => {
  const { city, street, suite, geo, zipcode } = user.address;
  return (
    <Box w={"100%"} p={2} border={"1px"} borderColor="gray.300">
      <HStack spacing={"10px"}>
        <Text as="b">Geo:</Text>
        <Text color={"blue.500"}>
          lat:{<Badge>{geo.lat}</Badge>} long:{<Badge>{geo.lng}</Badge>}
        </Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">City:</Text>
        <Text color={"blue.500"}>{city}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Suite:</Text>
        <Text color={"blue.500"}>{suite}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Street:</Text>
        <Text color={"blue.500"}>{street}</Text>
      </HStack>
      <HStack spacing={"10px"}>
        <Text as="b">Zipcode:</Text>
        <Text noOfLines={1} color={"blue.500"}>
          {zipcode}
        </Text>
      </HStack>
    </Box>
  );
};

ListItem1.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
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

Company.propTypes = {
  user: PropTypes.shape({
    company: PropTypes.shape({
      name: PropTypes.string,
      catchPhrase: PropTypes.string,
      bs: PropTypes.string,
    }),
  }),
};

Address.propTypes = {
  user: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string,
      street: PropTypes.string,
      suite: PropTypes.string,
      zipcode: PropTypes.string,
      geo: PropTypes.object,
    }),
  }),
};
