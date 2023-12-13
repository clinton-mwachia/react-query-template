import { useState } from "react";
import {
  FormControl,
  Stack,
  Input,
  Textarea,
  Button,
  Tag,
} from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { getPostById, newPost } from "./Helpers";

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
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.response.data.message);
    },
  });

  const {
    isError,
    data: postById,
    error,
  } = useQuery(
    {
      queryKey: ["post", post.id],
      queryFn: () => getPostById({ id: post.id }),
      enabled: !!post.id, // The query will not execute until the post id exists
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
    let _post = { ...post };

    _post[`${name}`] = val;

    setPost(_post);
  };

  const onInputNumChange = (e, name) => {
    const val = e.target.value || 0;
    let _post = { ...post };

    _post[`${name}`] = val;

    setPost(_post);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ formData: post });
    setPost(POST);
    setAdd(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ base: "column", md: "column", sm: "column" }}>
        <FormControl>
          <label htmlFor="id">id</label>
          <Input
            id="id"
            name="id"
            type="number"
            onChange={(e) => onInputNumChange(e, "id")}
            value={post.id}
          />
          {postById && postById.length === 0 ? (
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
      <Button onClick={() => setAdd(false)}>Cancel</Button>
    </form>
  );
};

Form.propTypes = {
  setAdd: PropTypes.func,
};

export default Form;
