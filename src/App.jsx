import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

import ViewStore from "./components/ViewStore";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

function App() {
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    try {
      const passwords = localStorage.getItem("passwords");

      if (passwords) {
        setpasswordArray(JSON.parse(passwords));
      }
    } catch (error) {
      console.error("Unable to load saved passwords:", error);
    }
  }, []);

  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Manager
                passwordArray={passwordArray}
                setpasswordArray={setpasswordArray}
                form={form}
                setform={setform}
              />
            }
          />
          <Route
            path="/view-store"
            element={
              <ViewStore
                passwordArray={passwordArray}
                setpasswordArray={setpasswordArray}
                form={form}
                setform={setform}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
