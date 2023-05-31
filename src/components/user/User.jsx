import { Link, useParams } from "react-router-dom";
import { getUser } from "./Helpers";
import { useQuery } from "@tanstack/react-query";
import { SimpleGrid, Box, Container, Stack } from "@chakra-ui/react";
import { ListItem1, ListItem2 } from "./ListItem";
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
          <Stack direction={"column"}>
            <ListItem1 user={user} />
            <ListItem2 user={user} />
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
