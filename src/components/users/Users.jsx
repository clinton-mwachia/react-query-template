import {
  Box,
  Stack,
  Container,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { getUsers } from "./Helpers";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import Search from "./Search";
import { useState } from "react";

const Users = () => {
  const [searchText, setSearchText] = useState("");
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
    return <span>Loading...</span>;
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
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

  const suggestionsData =
    users &&
    users.filter((item) =>
      item.name.toLowerCase().startsWith(searchText.toLowerCase())
    );

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
      </Stack>

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
