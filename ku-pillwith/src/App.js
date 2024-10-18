import { useEffect } from "react";
import "./App.css";
import { UserProvider } from "./api/UserContext";
import Router from "./route/Router";

function App() {
  //공공데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/pills/fetch");
        if (response.ok) {
          console.log("Data fetched and stored successfully");
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
