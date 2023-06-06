import { Suspense, lazy } from "react";
import Spiner from "./components/spinner/Spiner";
import "./App.css";

const Users = lazy(() => import("./components/users/Users"));

const App = () => {
  return (
    <Suspense fallback={<Spiner />}>
      <Users />
    </Suspense>
  );
};

export default App;
