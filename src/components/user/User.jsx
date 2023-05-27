import { Link, useParams } from "react-router-dom";

import { getUser } from "./Helpers";
import { useQuery } from "@tanstack/react-query";

const User = () => {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: user,
    error,
    isPaused,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    networkMode: "offlineFirst",
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isPaused) {
    return <span>Cannot fetch data, you are offline</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  console.log(user);
  return (
    <div>
      User : {id}
      <br />
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default User;
