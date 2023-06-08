import { Suspense, lazy } from "react";
import Spiner from "./components/spinner/Spiner";
import "./App.css";

const Posts = lazy(() => import("./components/posts/Posts"));

const App = () => {
  return (
    <Suspense fallback={<Spiner />}>
      <Posts />
    </Suspense>
  );
};

export default App;
