import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { Header } from "./components/Header";
import { WarehouseWeekOverview } from "./pages/WarehouseWeekOverview";
import { Login } from "./pages/Login";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<WarehouseWeekOverview />} />
          <Route path="/test" element={<h1>test</h1>} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
