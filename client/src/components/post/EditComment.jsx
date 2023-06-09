import PropTypes from "prop-types";
import { useState } from "react";
import {
  Badge,
  Textarea,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "./Helpers";

const EditComment = ({ comment, postId, setEdit }) => {
  const { name, body, email, id } = comment || {};
  let emptyComment = {
    name: name,
    email: email,
    body: body,
  };
  const [Comment, setComment] = useState(emptyComment);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateComment,
    networkMode: "offlineFirst",
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      alert(data.message);
      setEdit(false);
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
    mutation.mutate({ id, formData: Comment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Name"
          value={Comment.email}
          onChange={(e) => onInputChange(e, "email")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Textarea
          placeholder="Name"
          value={Comment.name}
          onChange={(e) => onInputChange(e, "name")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Body</FormLabel>
        <Textarea
          placeholder="Body"
          value={Comment.body}
          onChange={(e) => onInputChange(e, "body")}
        />
      </FormControl>

      <Badge
        position={"absolute"}
        backgroundColor={"red.200"}
        zIndex={2}
        top={"-10px"}
        right={"200px"}
        px={2}
      >
        Edit Comment
      </Badge>

      <Button type="submmit" mt={2}>
        Save
      </Button>
    </form>
  );
};

EditComment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    body: PropTypes.string,
    formData: PropTypes.arrayOf(PropTypes.string, PropTypes.number),
  }),
  postId: PropTypes.string,
  setEdit: PropTypes.func,
};

export default EditComment;
