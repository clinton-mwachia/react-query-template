import { Link, useParams } from "react-router-dom";
import { getUser } from "./Helpers";
import { useQuery } from "@tanstack/react-query";
import { SimpleGrid, Box, Container, Stack } from "@chakra-ui/react";
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
    <Container maxW={"7xl"} p={2}>
      <SimpleGrid columns={{ base: 3, md: 2, sm: 1 }} spacing={3}>
        <Stack direction="column">
          <Box bg={"blue.400"} w={"100%"} textAlign={"center"} p={2}>
            <Avatar size={"xl"} />
          </Box>
          <Stack direction={"row"}>
            <Box bg={"purple.400"} w={"100%"} textAlign={"center"}>
              23
            </Box>
            <Box bg={"green.400"} w={"100%"} textAlign={"center"}>
              24
            </Box>
          </Stack>
        </Stack>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
      </SimpleGrid>
      <Link to={"/"}>Home</Link>
    </Container>
  );
};

export default User;
