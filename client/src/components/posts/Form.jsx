import { useState } from "react";
import { FormControl, Stack, Input, Textarea, Button } from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { newPost } from "./Helpers";

const Form = ({ setAdd }) => {
  let POST = {
    id: 1,
    userId: 1,
    title: "",
    body: "",
  };
  const [post, setPost] = useState(POST);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: newPost,
    networkMode: "offlineFirst",
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert(data.message);
    },
  });

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...post };

    _user[`${name}`] = val;

    setPost(_user);
  };

  const onInputNumChange = (e, name) => {
    const val = e.target.value || 0;
    let _user = { ...post };

    _user[`${name}`] = val;

    setPost(_user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ formData: post });
    setPost(POST);
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
            value={post.id}
          />
        </FormControl>

        <FormControl>
          <label htmlFor="userId">userId</label>
          <Input
            id="userId"
            name="userId"
            type="number"
            onChange={(e) => onInputNumChange(e, "userId")}
            value={post.userId}
          />
        </FormControl>
        <FormControl>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            type="text"
            onChange={(e) => onInputChange(e, "title")}
            value={post.title}
          />
        </FormControl>
        <FormControl>
          <label htmlFor="body">Body</label>
          <Textarea
            id="body"
            name="bodye"
            type="text"
            onChange={(e) => onInputChange(e, "body")}
            value={post.body}
          />
        </FormControl>
      </Stack>

      <Button type="submit">Save</Button>
    </form>
  );
};

Form.propTypes = {
  setAdd: PropTypes.func,
};

export default Form;
