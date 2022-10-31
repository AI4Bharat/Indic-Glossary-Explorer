import {
  BrowserRouter as Router,
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useRoutes,
  redirect
} from "react-router-dom";
import Login from "./ui/pages/container/UserManagement/Login";

import { ThemeProvider } from "@mui/material/styles";
import themeDefault from "./ui/theme/theme";

import Layout from "./ui/ProtectedLayout";
import PublicLayout from "./ui/PublicLayout";
import UploadGlossary from "./ui/pages/container/UploadGlossary/UploadGlossary";
import SearchAndViewGlossary from "./ui/pages/container/SearchAndViewGlossary/SearchAndViewGlossary";

import { authenticateUser } from "./utils/utils";



const App = () => {
  const ProtectedRoute = ({ user, children }) => {
    console.log("authenticateUser() ---- ", authenticateUser())
    if (!authenticateUser()) {
      return redirect('/user/login');
    }
    return children;
  };

  const ProtectedRouteWrapper = (component) => {
    return <ProtectedRoute>{component}</ProtectedRoute>;
  };

  return (
    <HashRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route
          path="/"
          element={<PublicLayout component={<SearchAndViewGlossary />} Backbutton={true} />}
        />
        <Route path="/user/login" element={<Login />} />
        <Route
          path="/view-glossary"
          element={ProtectedRouteWrapper(<Layout component={<SearchAndViewGlossary />} Backbutton={true} />)}
        />
        <Route
          path="/add-glossary"
          element={ProtectedRouteWrapper(<Layout component={<UploadGlossary />} Backbutton={true} />)}
        />
        <Route path="*" element={<h1>page not found 404</h1>} />
      </Routes>
    </HashRouter>
  );
};

const AppWrapper = () => {
  return (
    <ThemeProvider theme={themeDefault}>
      <App />
    </ThemeProvider>
  );
};

export default AppWrapper;
