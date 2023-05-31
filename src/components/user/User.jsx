import { Link, useParams } from "react-router-dom";
import { getUser } from "./Helpers";
import { useQuery } from "@tanstack/react-query";
import { SimpleGrid, Box, Container, Stack, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

const User = () => {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: user,
    error,
    isPaused,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
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
  console.log(user);
  return (
    <Container maxW={"5xl"} p={2}>
      <SimpleGrid columns={{ base: 3, md: 2, sm: 1 }} spacing={3}>
        <Stack direction="column">
          <Box
            w={"100%"}
            textAlign={"center"}
            p={2}
            border={"1px"}
            borderColor={"black"}
          >
            <Avatar size={"xl"} bg="teal.500" />
          </Box>
          <Stack direction={"row"}>
            <Box
              bg={"red.400"}
              w={{ base: "60%" }}
              p={2}
              border={"1px"}
              borderColor="gray.200"
            >
              <Text>{user.id}</Text>
              <Text>{user.name}</Text>
              <Text>{user.username}</Text>
            </Box>
            <Box bg={"green.400"} w={"100%"} p={2}>
              <Text noOfLines={1}>{user.phone}</Text>
              <Text>{user.website}</Text>
              <Text>{user.email}</Text>
            </Box>
          </Stack>
        </Stack>
        <Box bg="tomato" height="80px" w={"100%"}></Box>
        <Box bg="tomato" height="80px" w={"100%"}></Box>
      </SimpleGrid>
      <Link to={"/"}>Home</Link>
    </Container>
  );
};

export default User;
