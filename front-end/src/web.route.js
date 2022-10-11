import {
  BrowserRouter as Router,
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import Login from "./ui/pages/container/UserManagement/Login";

import { ThemeProvider } from "@mui/material/styles";
import themeDefault from "./ui/theme/theme";

import Layout from "./ui/Layout";

// import { authenticateUser } from "./utils/utils";



const App = () => {
  // const ProtectedRoute = ({ user, children }) => {
  //   if (!authenticateUser()) {
  //     return <Link href="/" />;
  //   }
  //   return children;
  // };

  // const ProtectedRouteWrapper = (component) => {
  //   return <ProtectedRoute>{component}</ProtectedRoute>;
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
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