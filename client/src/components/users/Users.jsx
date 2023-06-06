import {
  Box,
  Stack,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  ModalCloseButton,
  FormControl,
  ModalFooter,
  FormLabel,
  ModalOverlay,
  ModalContent,
  Input,
} from "@chakra-ui/react";
import { getUsers } from "./Helpers";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import Search from "./Search";
import { useState } from "react";
//TODO: ADD USER FUNCTIONALITY
const Users = () => {
  let emptyUser = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const {
    isLoading,
    isError,
    data: users,
    error,
    isPaused,
  } = useQuery(["users"], getUsers, {
    networkMode: "offlineFirst",
  });

  if (isLoading) {
    return <span>Loading data...</span>;
  }

  if (isPaused) {
    return <span>Cannot fetch data, you are offline</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const filteredUsers =
    users &&
    users.filter((item) =>
      item.name?.toLowerCase().includes(searchText.toLowerCase())
    );

  const suggestionsData =
    users &&
    users.filter((item) =>
      item.name?.toLowerCase().startsWith(searchText.toLowerCase())
    );

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...user };

    _user[`${name}`] = val;

    setUser(_user);
  };

  const onInputNumChange = (e, name) => {
    const val = (e.target && e.target.value) || 0;
    let _user = { ...user };

    _user[`${name}`] = val;

    setUser(_user);
  };

  return (
    <Box>
      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        mt={20}
      >
        <Heading
          fontSize={{ base: "2xl", sm: "4xl" }}
          fontWeight={"bold"}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Learn React Query
        </Heading>

        <Box bg={"gray.200"} p={2}>
          <Search
            searchText={searchText}
            setSearchText={setSearchText}
            suggestions={suggestionsData}
          />
        </Box>
        <Box>
          <Button onClick={() => setIsOpen(true)}>Add User</Button>
        </Box>
      </Stack>

      <>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="First name"
                    value={user.name}
                    onChange={(e) => onInputChange(e, "name")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="email"
                    value={user.email}
                    onChange={(e) => onInputChange(e, "email")}
                  />
                </FormControl>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    type={"submit"}
                    mr={3}
                    onClick={(e) => {
                      e.preventDefault();
                      alert("save");
                      setIsOpen(false);
                    }}
                  >
                    Save
                  </Button>
                  <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>

      <Container maxW={"4xl"} mb={7} p={5}>
        {filteredUsers && filteredUsers.length > 0 ? (
          <SimpleGrid
            columns={{ base: 3, md: 3, sm: 1 }}
            spacing={"10px"}
            p={2}
            justify="center"
            mt={2}
          >
            {filteredUsers.map((user, index) => (
              <div key={index}>
                <Card name={user.name} href={`users/${user.id}`} />
              </div>
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign={"center"} p={3}>
            <Text fontFamily={"ink free"} fontSize={"20"} fontWeight={"bold"}>
              No users found
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Users;
