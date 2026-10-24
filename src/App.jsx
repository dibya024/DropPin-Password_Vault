import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

import ViewStore from "./components/ViewStore";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Signin from "./components/Signin";
import NotFound from "./components/404";
import Login from "./components/Login";
import PreloginHomepage from "./components/PreloginHomepage";

import { getPasswords } from "./api/passwords";

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

  const isloggedin = false;

  return (
    <BrowserRouter>
      <Navbar isloggedin={isloggedin} />
      <main>
        {isloggedin && loadError && (
          <p
            role="alert"
            className="flex justify-center font-semibold bg-linear-to-r from-red-600 via-orange-500 to-violet-400"
          >
            Unable to load saved passwords: {loadError}
          </p>
        )}
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<PreloginHomepage/>}></Route>
          {isloggedin ? (
            <>
              <Route
                path="/home"
                element={
                  <Manager
                    passwordArray={passwordArray}
                    setpasswordArray={setpasswordArray}
                    form={form}
                    setform={setform}
                    editingId={editingId}
                    seteditingId={seteditingId}
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
                    seteditingId={seteditingId}
                  />
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout"></Route>
            </>
          ) : null}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
      {isloggedin && <Footer />}
    </BrowserRouter>
  );
}

export default App;
