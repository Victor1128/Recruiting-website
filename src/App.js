import "./App.css";
import Button from "./components/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AuthDetails from "./components/AuthDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Button>Click me</Button>}> */}
        <Route
          index
          element={
            <>
              {" "}
              <Signin /> <AuthDetails />{" "}
            </>
          }
        />
        {/* </Route> */}
        <Route path="login" element={<Signin />} />
        <Route path="sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
