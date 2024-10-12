import "./App.css";
import { UserProvider } from "./api/UserContext";
import Router from "./route/Router";

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
