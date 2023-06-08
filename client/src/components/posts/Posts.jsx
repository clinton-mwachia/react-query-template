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
import { getPosts } from "./Helpers";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import Search from "./Search";
import { useState } from "react";

const Posts = () => {
  let emptyPost = {
    body: "",
    id: 0,
    title: "",
    userId: 0,
  };
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(emptyPost);
  const {
    isLoading,
    isError,
    data: posts,
    error,
    isPaused,
  } = useQuery(["posts"], getPosts, {
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

  const filteredPosts =
    posts &&
    posts.filter((item) =>
      item.title?.toLowerCase().includes(searchText.toLowerCase())
    );

  const suggestionsData =
    posts &&
    posts.filter((item) =>
      item.title?.toLowerCase().startsWith(searchText.toLowerCase())
    );

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _post = { ...post };

    _post[`${name}`] = val;

    setPost(_post);
  };
  /*
  const onInputNumChange = (e, name) => {
    const val = (e.target && e.target.value) || 0;
    let _post = { ...post };

    _post[`${name}`] = val;

    setPost(_post);
  };
*/
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
          <Button onClick={() => setIsOpen(true)}>Add Post</Button>
        </Box>
      </Stack>

      <>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="First name"
                    value={post.name}
                    onChange={(e) => onInputChange(e, "name")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="email"
                    value={post.email}
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
        {filteredPosts && filteredPosts.length > 0 ? (
          <SimpleGrid
            columns={{ base: 3, md: 3, sm: 1 }}
            spacing={"10px"}
            p={2}
            justify="center"
            mt={2}
          >
            {filteredPosts.map((post, index) => (
              <div key={index}>
                <Card title={post.title} href={`posts/${post.id}`} />
              </div>
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign={"center"} p={3}>
            <Text fontFamily={"ink free"} fontSize={"20"} fontWeight={"bold"}>
              No posts found
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Posts;
