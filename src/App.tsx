import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { Header } from "./components/Header";
import { WarehouseMonthOverview } from "./pages/WarehouseMonthOverview/WarehouseMonthOverview";
import { Login } from "./pages/Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import { WareHouseWeekOverviewContainer } from "./pages/WarehouseWeekOverview/WarehouseWeekOverviewContainer";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<WarehouseMonthOverview />} />
          <Route
            path="/dock/:dockId/:weekNr"
            element={<WareHouseWeekOverviewContainer />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
