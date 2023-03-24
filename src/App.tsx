import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { Header } from "./components/Header";
import { WarehouseWeekOverview } from "./pages/WarehouseWeekOverview";
import { DockWeekOverview } from "./pages/DockWeekOverview/DockWeekOverview";
import { Login } from "./pages/Login";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<WarehouseWeekOverview />} />
          <Route path="/dock/:dockId/:weekNr" element={<DockWeekOverview />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
