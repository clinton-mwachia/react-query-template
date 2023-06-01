import { Link, useParams } from "react-router-dom";
import { getUser } from "./Helpers";
import { useQuery } from "@tanstack/react-query";
import { SimpleGrid, Box, Container, Badge, Button } from "@chakra-ui/react";
import { Address, Company, ListItem1, ListItem2 } from "./ListItem";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
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
  return (
    <Container maxW={"2xl"} p={4}>
      <Box
        w={"100%"}
        textAlign={"center"}
        p={2}
        border={"1px"}
        borderColor={"black"}
        mb={3}
      >
        <Avatar size={"xl"} bg="teal.500" />
      </Box>
      <SimpleGrid columns={{ base: 2, md: 2, sm: 1 }} spacing={3}>
        <ListItem1 user={user} />
        <ListItem2 user={user} />
        <Box w={"100%"}>
          <Company user={user} />
          <Badge p={2} mt={2}>
            <Link to={"/"}>
              <ArrowBackIcon boxSize={6} />
            </Link>
          </Badge>
          <Button ml={2} mt={2} p={2}>
            <EditIcon boxSize={6} />
          </Button>
        </Box>
        <Box w={"100%"}>
          <Address user={user} />
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default User;
