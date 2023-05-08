import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { Header } from "./components/Header/Header";
import { WarehouseMonthOverview } from "./pages/WarehouseMonthOverview/WarehouseMonthOverview";
import { WarehouseDockOverviewPage } from "./pages/WarehouseDockOverview/WarehouseDockOverviewPage";
import { DockPlanner } from "./pages/DockPlanner/DockPlanner";
import { Login } from "./pages/Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import { WareHouseWeekOverviewContainer } from "./pages/WarehouseWeekOverview/WarehouseWeekOverviewContainer";
import { Temp } from "./pages/WarehouseWeekOverview/Temp";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<WarehouseMonthOverview />} />
          <Route
            path="/dock-overview"
            element={<WarehouseDockOverviewPage />}
          ></Route>
          <Route path="/dock/:dockId/:weekNr" element={<Temp />} />
          <Route path="/plan" element={<DockPlanner />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
