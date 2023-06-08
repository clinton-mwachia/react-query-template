import { Link, useParams } from "react-router-dom";
import { getPost, deleteComment, getCommentsByPostId } from "./Helpers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SimpleGrid,
  Box,
  Container,
  Badge,
  Button,
  Text,
} from "@chakra-ui/react";
import { ListComments } from "./ListItem";
import { useNavigate } from "react-router-dom";

import {
  ArrowBackIcon,
  EditIcon,
  SmallCloseIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
//import EditComment from "./EditComment";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const {
    isLoading,
    isError,
    data: post,
    error,
    isPaused,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    networkMode: "offlineFirst",
  });

  const {
    isLoading: isLoading1,
    isError: isError1,
    data: comments,
    error: error1,
    isPaused: isPaused1,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsByPostId(id),
    networkMode: "offlineFirst",
  });

  /* const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    });*/
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isPaused) {
    return <span>Cannot fetch data, you are offline</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isLoading1) {
    return <span>Loading comments...</span>;
  }

  if (isPaused1) {
    return <span>Cannot fetch comments, you are offline</span>;
  }

  if (isError1) {
    return <span>Error: - comments - {error1.message}</span>;
  }
  const handleDelete = (e, data) => {
    e.preventDefault();
    alert(`delete ${data.id}`);
    // mutation.mutate({ id });
    navigate("/");
  };

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
        <Text>Post id - {post[0].id}</Text>
      </Box>
      <SimpleGrid columns={{ base: 2, md: 2, sm: 1 }} spacing={3}>
        {comments.map((comment) => (
          <div key={comment.id}>
            <ListComments comments={comment} />
            <Box>
              <Button
                ml={2}
                mt={2}
                p={2}
                onClick={() => {
                  setEdit(!edit);
                  alert(`edit ${comment.id}`);
                  navigate(`/edit/comment/${comment.id}`);
                }}
              >
                {edit ? (
                  <>
                    <SmallCloseIcon boxSize={3} />
                  </>
                ) : (
                  <EditIcon boxSize={3} />
                )}
              </Button>
              {edit ? null : (
                <Button
                  ml={2}
                  mt={2}
                  p={2}
                  onClick={(e) => handleDelete(e, comment)}
                >
                  <DeleteIcon boxSize={3} />
                </Button>
              )}
            </Box>
          </div>
        ))}
      </SimpleGrid>
      <Box>
        <Badge p={2} mt={2}>
          <Link to={"/"}>
            <ArrowBackIcon boxSize={5} />
          </Link>
        </Badge>
      </Box>
    </Container>
  );
};

export default Post;
