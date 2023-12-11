import { Suspense, lazy, useEffect } from "react";
import Spiner from "./components/spinner/Spiner";
import "./App.css";
import { io } from "socket.io-client";

const Posts = lazy(() => import("./components/posts/Posts"));

const App = () => {
  useEffect(() => {
    const socket = io("http://localhost:8010");
    socket.on("test", (msg) => {
      console.log(msg);
    });
  }, []);

  return (
    <Suspense fallback={<Spiner />}>
      <Posts />
    </Suspense>
  );
};

export default App;
