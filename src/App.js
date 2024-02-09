import "./App.css";
import Button from "./components/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AuthDetails from "./components/AuthDetails";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/RequiteAuth";
import Portfolio from "./components/Portfolio";
import CreateProject from "./pages/User/CreateProject";
import ViewPortfolio from "./pages/User/ViewPortfolio";
import Forbidden from "./pages/Forbidden";
import ViewPortfolios from "./pages/Recruiter/ViewPortfolios";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<RequireAuth role={"user"} />}>
            <Route path="/portfolio" element={<ViewPortfolio />} />
            <Route path="/create" element={<CreateProject />} />
          </Route>
          <Route element={<RequireAuth role={"recruiter"} />}>
            <Route path="/all-portfolios" element={<ViewPortfolios />} />
          </Route>
          <Route element={<RequireAuth />}></Route>
          <Route path="/details" element={<AuthDetails />} />
          <Route index element={<Signin />} />
          <Route path="login" element={<Signin />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
