import { useEffect, useState } from "react";
import "./App.css";
import { UserProvider } from "./api/UserContext";
import Router from "./route/Router";

function App() {
  const [pills, setPills] = useState([]);
  //공공데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      if (pills.length > 0) return;
      try {
        const response = await fetch("http://localhost:3001/pills/fetch");
        if (response.ok) {
          const data = await response.json();
          setPills(data);
          console.log("Data fetched and stored successfully");
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pills]);

  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
