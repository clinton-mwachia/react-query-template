import { useState } from "react";
import { FormControl, Stack, Input, Textarea, Button } from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { addComment } from "./Helpers";

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
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      alert(data.message);
    },
  });

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
            name="bodye"
            type="text"
            onChange={(e) => onInputChange(e, "body")}
            value={comment.body}
          />
        </FormControl>
      </Stack>

      <Button type="submit">Save</Button>
    </form>
  );
};

Form.propTypes = {
  setAdd: PropTypes.func,
  id: PropTypes.number,
};

export default Form;
