import "./App.css";
import Button from "./components/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AuthDetails from "./components/AuthDetails";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/RequiteAuth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/details" element={<AuthDetails />} />
          </Route>
          <Route index element={<Signin />} />
          <Route path="login" element={<Signin />} />
          <Route path="sign-up" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
