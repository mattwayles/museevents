import React from "react";
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeView from "./views/HomeView";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
        <BrowserRouter>
            <NavigationBar />
                <Routes>
                    <Route path="/" element={<HomeView />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
