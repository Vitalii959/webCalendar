import {BrowserRouter} from "react-router";
import {AppRoutes} from "./AppRoutes";
import {AuthListener} from "@/entities/user/model/AuthListener";

function App() {
  return (
    <BrowserRouter>
      <AuthListener />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
