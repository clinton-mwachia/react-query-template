import PropTypes from "prop-types";
import { useState } from "react";
import { Badge, Box, Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "./Helpers";
import { useNavigate } from "react-router-dom";

const EditComment = ({ comment }) => {
  const { name, body, email } = comment || {};
  let emptyComment = {
    name: name,
    email: email,
    body: body,
  };
  const [Comment, setComment] = useState(emptyComment);
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...Comment };

    _user[`${name}`] = val;

    setComment(_user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ formData: Comment });
    navigation("/");
    //console.log(Comment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid columns={{ base: 2, md: 2, sm: 1 }} spacing={3}>
        <Box
          w={"100%"}
          p={2}
          border={"1px"}
          borderColor="gray.300"
          position={"relative"}
        >
          <Box position={"relative"} zIndex={1}>
            <HStack spacing={"10px"}>
              <Text as={"b"}>Name:</Text>
              <input
                type="string"
                value={Comment.name}
                onChange={(e) => onInputChange(e, "name")}
              />
            </HStack>
            <HStack spacing={"10px"} mt={2}>
              <Text as={"b"}>Email:</Text>
              <input
                type="string"
                value={Comment.email}
                onChange={(e) => onInputChange(e, "email")}
              />
            </HStack>
            <HStack spacing={"10px"} mt={2}>
              <Text as={"b"}>Body:</Text>
              <input
                type="string"
                value={Comment.body}
                onChange={(e) => onInputChange(e, "body")}
              />
            </HStack>
          </Box>
          <Badge
            position={"absolute"}
            backgroundColor={"red.200"}
            zIndex={2}
            top={"-10px"}
            right={"140px"}
            px={2}
          >
            Basic
          </Badge>
        </Box>
      </SimpleGrid>
      <Button type="submmit" mt={2}>
        Save
      </Button>
    </form>
  );
};

EditComment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
    formData: PropTypes.arrayOf(PropTypes.string, PropTypes.number),
  }),
};

export default EditComment;
