import { Suspense, lazy } from "react";
import "./App.css";

const Users = lazy(() => import("./components/users/Users"));
const Spiner = lazy(() => import("./components/spinner/Spiner"));

const App = () => {
  return (
    <Suspense fallback={<Spiner />}>
      <Users />
    </Suspense>
  );
};

export default App;
