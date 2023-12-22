import { useState } from "react";
import {
  FormControl,
  Stack,
  Tag,
  Input,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { addComment, getCommentById } from "./Helpers";

const Form = ({ setAdd, id }) => {
  let COMMENT = {
    postId: id,
    id: 1,
    name: "",
    email: "",
    body: "",
  };
  const [comment, setComment] = useState(COMMENT);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    networkMode: "offlineFirst",
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", comment.postId] });
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.response.data.message);
    },
  });

  const {
    isError,
    data: commentById,
    error,
  } = useQuery(
    {
      queryKey: ["post", comment.id],
      queryFn: () => getCommentById({ id: comment.id }),
      enabled: !!comment.id, // The query will not execute until the comment id exists
    },
    {
      networkMode: "offlineFirst",
    }
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _comment = { ...comment };

    _comment[`${name}`] = val;

    setComment(_comment);
  };

  const onInputNumChange = (e, name) => {
    const val = e.target.value || 0;
    let _comment = { ...comment };

    _comment[`${name}`] = val;

    setComment(_comment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ formData: comment });
    setComment(COMMENT);
    setAdd(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ base: "row", md: "column", sm: "column" }}>
        <FormControl>
          <label htmlFor="id">id</label>
          <Input
            id="id"
            name="id"
            type="number"
            onChange={(e) => onInputNumChange(e, "id")}
            value={comment.id}
          />
          {commentById && commentById.length === 0 ? (
            <Tag colorScheme="green" variant={"solid"} mt={2}>
              id is available
            </Tag>
          ) : (
            <Tag colorScheme="red" variant={"solid"} mt={2}>
              id is taken
            </Tag>
          )}
        </FormControl>

        <FormControl>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={(e) => onInputNumChange(e, "name")}
            value={comment.name}
          />
        </FormControl>
        <FormControl>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="text"
            onChange={(e) => onInputChange(e, "email")}
            value={comment.email}
          />
        </FormControl>
        <FormControl>
          <label htmlFor="body">Body</label>
          <Textarea
            id="body"
            name="body"
            type="text"
            onChange={(e) => onInputChange(e, "body")}
            value={comment.body}
          />
          <Text mt={1} color={comment.body.length > 100 ? "red" : "gray.600"}>
            words: {comment.body.length} / 100
          </Text>
        </FormControl>
      </Stack>

      <Button type="submit">Save</Button>
    </form>
  );
};

Form.propTypes = {
  setAdd: PropTypes.func,
  id: PropTypes.string,
};

export default Form;
