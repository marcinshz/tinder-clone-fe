import React from "react";
import MainTemplate from "./templates/MainTemplate";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Homepage from "./pages/Homepage/Homepage";
import { usersList } from "./demodata";

function App() {
    const currentUser = usersList[0];
    return (
        <BrowserRouter>
            <MainTemplate>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/profile" element={<Profile user={currentUser} />} />
                </Routes>
            </MainTemplate>
        </BrowserRouter>
    );
}

export default App;
