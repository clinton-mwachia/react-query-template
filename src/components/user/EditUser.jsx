import PropTypes from "prop-types";
import { useState } from "react";
import { Badge, Box, Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "./Helpers";
import { useNavigate } from "react-router-dom";

const EditUser = ({ user }) => {
  const { name, username, email, phone, website, id, address, company } =
    user || {};
  let emptyUser = {
    name: name,
    username: username,
    email: email,
    phone: phone,
    website: website,
    id: id,
    company: {
      name: company.name,
      bs: company.bs,
      catchPhrase: company.catchPhrase,
    },
    address: {
      city: address.city,
      street: address.street,
      suite: address.suite,
      geo: {
        lat: address.geo.lat,
        lng: address.geo.lng,
      },
      zipcode: address.zipcode,
    },
  };
  const [User, setUser] = useState(emptyUser);
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...User };

    _user[`${name}`] = val;

    setUser(_user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id, formData: User });
    navigation("/");
    //console.log(User);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid columns={{ base: 2, md: 2, sm: 1 }} spacing={3}>
        <Box
          w={"100%"}
          p={2}
          border={"1px"}
          borderColor="gray.300"
          position={"relative"}
        >
          <Box position={"relative"} zIndex={1}>
            <HStack spacing={"10px"}>
              <Text as={"b"}>ID:</Text>
              <input
                type="number"
                value={User.id}
                onChange={(e) => onInputChange(e, "id")}
              />
            </HStack>
            <HStack spacing={"10px"}>
              <Text as={"b"}>Name:</Text>
              <input
                type="string"
                value={User.name}
                onChange={(e) => onInputChange(e, "name")}
              />
            </HStack>
            <HStack spacing={"10px"} mt={2}>
              <Text as={"b"}>Username:</Text>
              <input
                type="string"
                value={User.username}
                onChange={(e) => onInputChange(e, "username")}
              />
            </HStack>
          </Box>
          <Badge
            position={"absolute"}
            backgroundColor={"red.200"}
            zIndex={2}
            top={"-10px"}
            right={"140px"}
            px={2}
          >
            Basic
          </Badge>
        </Box>
        <Box w={"100%"} p={2} border={"1px"} borderColor="gray.300">
          <HStack spacing={"10px"}>
            <Text as="b">Email</Text>
            <input
              type="string"
              value={User.email}
              onChange={(e) => onInputChange(e, "email")}
            />
          </HStack>
          <HStack spacing={"10px"}>
            <Text as={"b"}>Phone:</Text>
            <input
              type="string"
              value={User.phone}
              onChange={(e) => onInputChange(e, "phone")}
            />
          </HStack>
          <HStack spacing={"10px"}>
            <Text as={"b"}>Website:</Text>
            <input
              type="string"
              value={User.website}
              onChange={(e) => onInputChange(e, "website")}
            />
          </HStack>
        </Box>
        <Box w={"100%"} p={2} border={"1px"} borderColor="gray.300">
          <HStack spacing={"10px"}>
            <Text as="b">Bs:</Text>
            <Text color={"blue.500"}>
              <Badge>{User.company.bs}</Badge>
            </Text>
          </HStack>
          <HStack spacing={"10px"}>
            <Text as="b">Name:</Text>
            <Text color={"blue.500"}>
              <Badge>{User.company.name}</Badge>
            </Text>
          </HStack>
          <HStack spacing={"10px"}>
            <Text as="b">CatchPhrase:</Text>
            <Text color={"blue.500"}>{User.company.catchPhrase}</Text>
          </HStack>
        </Box>
        <Box w={"100%"} p={2} border={"1px"} borderColor="gray.300">
          <HStack spacing={"10px"}>
            <Text as="b">Geo:</Text>
            <Text color={"blue.500"}>
              lat: <Badge>{User.address.geo.lat}</Badge>
              long: <Badge>{User.address.geo.lng}</Badge>
            </Text>
          </HStack>
          <HStack spacing={"10px"}>
            <Text as="b">City:</Text>
            <Text color={"blue.500"}>
              <Badge>{User.address.city}</Badge>
            </Text>
          </HStack>
          <HStack spacing={"10px"}>
            <Text as="b">Suite:</Text>
            <Text color={"blue.500"}>
              <Badge>{User.address.suite}</Badge>
            </Text>
          </HStack>
          <HStack spacing={"10px"}>
            <Text as="b">Street:</Text>
            <Text color={"blue.500"}>
              <Badge>{User.address.street}</Badge>
            </Text>
          </HStack>
          <HStack spacing={"10px"}>
            <Text as="b">Zipcode:</Text>
            <Text color={"blue.500"}>
              <Badge>{User.address.zipcode}</Badge>
            </Text>
          </HStack>
        </Box>
      </SimpleGrid>
      <Button type="submmit" mt={2}>
        Save
      </Button>
    </form>
  );
};

EditUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
    id: PropTypes.number,
    formData: PropTypes.arrayOf(PropTypes.string, PropTypes.number),
    company: PropTypes.shape({
      name: PropTypes.string,
      catchPhrase: PropTypes.string,
      bs: PropTypes.string,
    }),
    address: PropTypes.shape({
      city: PropTypes.string,
      street: PropTypes.string,
      suite: PropTypes.string,
      zipcode: PropTypes.string,
      geo: PropTypes.object,
    }),
  }),
};

export default EditUser;
