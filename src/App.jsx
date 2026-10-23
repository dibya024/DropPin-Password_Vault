import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

import ViewStore from "./components/ViewStore";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

import { getPasswords } from "./api/passwords";
// import { set } from "mongoose";

function App() {
  const [passwordArray, setpasswordArray] = useState([]);

  const [loadError, setloadError] = useState("");
  const [editingId, seteditingId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getPasswords()
      .then((passwords) => {
        if (isMounted) {
          setpasswordArray(passwords);
          setloadError("");
        }
      })
      .catch((err) => {
        console.error("Unable to load saved passwords:", err);
        if (isMounted) {
          setloadError(err.message);
        }
      });
    return () => {
      isMounted = false;
    };
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
        {loadError && (
          <p role="alert">Unable to load saved passwords: {loadError}</p>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Manager
                passwordArray={passwordArray}
                setpasswordArray={setpasswordArray}
                form={form}
                setform={setform}
                editingId= {editingId}
                seteditingId= {seteditingId}
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
                seteditingId= {seteditingId}
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
