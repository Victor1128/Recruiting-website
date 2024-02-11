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
import Messages from "./pages/User/Messages";
import Signout from "./pages/Signout";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setIsAuthenticatedUser, setIsAuthenticatedRecruiter, logout } from "./context/authReducer";
import { Provider } from "react-redux";
import { Store } from "./context/Store";

function AppWrapper() {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.photoURL === "user") {
          dispatch(setIsAuthenticatedUser());
        }
        else if (user.photoURL === "recruiter") {
          dispatch(setIsAuthenticatedRecruiter());
        }
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route index element={<Index />} />
          <Route element={<RequireAuth role={"user"} />}>
            <Route path="/portfolio" element={<ViewPortfolio />} />
            <Route path="/create" element={<CreateProject />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
          <Route element={<RequireAuth role={"recruiter"} />}>
            <Route path="/all-portfolios" element={<ViewPortfolios />} />
          </Route>
          <Route element={<RequireAuth />}></Route>
          {/* <Route path="/details" element={<AuthDetails />} /> */}
          <Route path="/signout" element={<Signout />} />
          <Route path="login" element={<Signin />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;
