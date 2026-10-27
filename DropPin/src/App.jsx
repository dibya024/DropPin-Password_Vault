import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

import ViewStore from "./components/ViewStore";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import NotFound from "./components/404";
import Login from "./components/Login";
import PreloginHomepage from "./components/PreloginHomepage";

import { getPasswords } from "./api/passwords";
import { getCurrentUser } from "./api/auth";

function App() {
  const [passwordArray, setpasswordArray] = useState([]);

  const [loadError, setloadError] = useState("");
  const [editingId, seteditingId] = useState(null);

  const [currentUser, setcurrentUser] = useState(null);
  const [authLoading, setauthLoading] = useState(true);
  const [authError, setauthError] = useState("");

  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [logoutPending, setLogoutPending] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      setpasswordArray([]);
      setloadError("");
      return;
    }

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
          if (err.status === 401) {
            setcurrentUser(null);
            setloadError("");
            setauthError("Your session has expired. Please log in again.");
          } else {
            setloadError(err.message);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, [authLoading, currentUser]);

  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    let isMounted = true;

    getCurrentUser()
      .then(({ user }) => {
        if (isMounted) {
          setcurrentUser(user);
          setauthError("");
        }
      })
      .catch((error) => {
        if (!isMounted) return;

        if (error.status === 401) {
          setcurrentUser(null);
          setauthError("");
        } else {
          setauthError(error.message);
        }
      })
      .finally(() => {
        if (isMounted) setauthLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const isloggedin = Boolean(currentUser);

  return (
    <BrowserRouter>
      {authLoading ? (
        <p role="status">Checking your session...</p>
      ) : (
        <>
          <Navbar isloggedin={isloggedin} />
          <main>
            {authError && (
              <p role="alert" className="flex justify-center text-rose-300">
                Unable to check your session: {authError}
              </p>
            )}
            {isloggedin && loadError && (
              <p
                role="alert"
                className="flex justify-center font-semibold bg-linear-to-r from-red-600 via-orange-500 to-violet-400"
              >
                Unable to load saved passwords: {loadError}
              </p>
            )}
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/login"
                element={<Login onLogin={setcurrentUser} />}
              />
              <Route path="/" element={<PreloginHomepage />} />
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
                  <Route
                    path="/profile"
                    element={
                      <Profile
                        form={form}
                        setform={setform}
                        currentUser={currentUser}
                        passwordArray={passwordArray}
                        onUserUpdated={setcurrentUser}
                        logoutPopupOpen={logoutPopupOpen}
                        setLogoutPopupOpen={setLogoutPopupOpen}
                        logoutError={logoutError}
                        setLogoutError={setLogoutError}
                        logoutPending={logoutPending}
                        setLogoutPending={setLogoutPending}
                        onLogout={() => setcurrentUser(null)}
                      />
                    }
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/home"
                    element={<Navigate to="/login" replace />}
                  />
                  <Route
                    path="/view-store"
                    element={<Navigate to="/login" replace />}
                  />
                  <Route
                    path="/profile"
                    element={<Navigate to="/login" replace />}
                  />
                </>
              )}
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </main>
          {isloggedin && <Footer />}
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
