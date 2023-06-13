import { Link, useParams } from "react-router-dom";
import { deleteComment, getCommentsByPostId } from "./Helpers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SimpleGrid,
  Box,
  Container,
  Badge,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { ListComments } from "./ListItem";
import { toast } from "react-toastify";

import { ArrowBackIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import EditComment from "./EditComment";
import Form from "./Form";

const Post = () => {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [editComm, setEditComm] = useState();

  const {
    isLoading,
    isError,
    data: comments,
    error,
    isPaused,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsByPostId(id),
    networkMode: "offlineFirst",
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteComment,
    networkMode: "offlineFirst",
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data);
    },
  });

  if (isLoading) {
    return <span>Loading comments...</span>;
  }

  if (isPaused) {
    return <span>Cannot fetch comments, you are offline</span>;
  }

  if (isError) {
    return <span>Error: - comments - {error.message}</span>;
  }

  return (
    <Container maxW={"3xl"} p={4}>
      <Box
        w={"100%"}
        textAlign={"center"}
        p={2}
        border={"1px"}
        borderColor={"black"}
        mb={3}
      >
        <Avatar size={"xl"} bg="teal.500" />
        <Text>Post id - {id}</Text>
      </Box>
      <Box textAlign={"center"} p={2}>
        <Button
          colorScheme="blue"
          w={"100%"}
          variant="outline"
          onClick={() => setAdd(!add)}
        >
          Comment
        </Button>
      </Box>
      {add ? (
        <Box>
          <Form setAdd={setAdd} id={id} />
        </Box>
      ) : null}
      {comments.length > 0 ? (
        <>
          <SimpleGrid columns={{ base: 2, md: 2, sm: 1 }} spacing={3} mt={5}>
            {comments.map((comment) => (
              <div key={comment.id}>
                <ListComments comments={comment} />
                <Box>
                  <Button
                    ml={2}
                    mt={2}
                    p={2}
                    onClick={(e) => {
                      e.preventDefault();
                      setEdit(true);
                      setEditComm(comment);
                    }}
                  >
                    <EditIcon boxSize={3} />
                  </Button>
                  {edit ? null : (
                    <Button
                      ml={2}
                      mt={2}
                      p={2}
                      onClick={() => mutation.mutate(comment.id)}
                    >
                      <DeleteIcon boxSize={3} />
                    </Button>
                  )}
                </Box>
              </div>
            ))}
          </SimpleGrid>
        </>
      ) : (
        <Box>No comments</Box>
      )}
      <Box>
        <Badge p={2} mt={2}>
          <Link to={"/"}>
            <ArrowBackIcon boxSize={5} />
          </Link>
        </Badge>
      </Box>
      {/** edit comment */}
      <Modal isOpen={edit} onClose={() => setEdit(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Update Comment</ModalHeader>
          <ModalBody pb={6}>
            <EditComment comment={editComm} postId={id} setEdit={setEdit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Post;
