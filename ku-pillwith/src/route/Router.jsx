import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import MedicinePage from "../pages/MedicinePage";
import ScheduleMainPage from "../pages/ScheduleMainPage";
import ScheduleListPage from "../pages/ScheduleListPage";
import ScheduleSearchPage from "../pages/ScheduleSearchPage";
import ScheduleDosagePage from "../pages/ScheduleDosagePage";
import MyPage from "../pages/MyPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/medicine/:id" element={<MedicinePage />} />
        <Route path="/schedule" element={<ScheduleMainPage />} />
        <Route path="/schedule/:time" element={<ScheduleListPage />} />
        <Route path="/schedule/:time/search" element={<ScheduleSearchPage />} />
        <Route
          path="/schedule/:time/search/:id"
          element={<ScheduleDosagePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
