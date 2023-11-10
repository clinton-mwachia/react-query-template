import {
  Box,
  Stack,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { getPosts } from "./Helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "./Card";
import Search from "./Search";
import { useState, useEffect } from "react";
import Form from "./Form";

const Posts = () => {
  const [searchText, setSearchText] = useState("");
  const [add, setAdd] = useState(false);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: posts,
    error,
    isPaused,
    isPreviousData,
    isFetching,
  } = useQuery(
    {
      queryKey: ["posts", page],
      queryFn: () => getPosts({ page: page, limit: 10 }),
      keepPreviousData: true,
      staleTime: 5000,
    },
    {
      networkMode: "offlineFirst",
    }
  );

  // Prefetch the next page posts
  useEffect(() => {
    if (!isPreviousData && posts?.hasMore) {
      queryClient.prefetchQuery(
        {
          queryKey: ["posts", page],
          queryFn: () => getPosts({ page: page, limit: 10 }),
        },
        {
          networkMode: "offlineFirst",
        }
      );
    }
  }, [posts, isPreviousData, page, queryClient]);

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
    posts.data.filter((item) =>
      item.title?.toLowerCase().includes(searchText.toLowerCase())
    );
  console.log(filteredPosts);
  const suggestionsData =
    posts &&
    posts.data.filter((item) =>
      item.title?.toLowerCase().startsWith(searchText.toLowerCase())
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
        <Box>
          <Button onClick={() => setAdd(!add)}>Add Post</Button>
        </Box>
      </Stack>

      <Container maxW={"4xl"} mb={7} p={5}>
        {add ? (
          <Box>
            <Form setAdd={setAdd} />
          </Box>
        ) : (
          <>
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
                <Text
                  fontFamily={"ink free"}
                  fontSize={"20"}
                  fontWeight={"bold"}
                >
                  No posts found
                </Text>
              </Box>
            )}
            <Text mb={2}>
              Pages: {page} / {posts.totalPages}
            </Text>
            <Button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              isDisabled={page === 1}
            >
              Previous Page
            </Button>{" "}
            <Button
              onClick={() => {
                setPage((old) => (posts?.hasMore ? old + 1 : old));
              }}
              isDisabled={isPreviousData || !posts?.hasMore}
            >
              Next Page
            </Button>
            {isFetching ? <span> Loading...</span> : null}{" "}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Posts;
