import { useRef, useState, useEffect } from "react";
import saveIcon from "../images/save-icon.png";
import eye from "../images/eye.png";
import eyeCross from "../images/eye-cross.png";

const Manager = () => {
  const ref = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes(eye)) {
      ref.current.src = eyeCross;
    } else {
      ref.current.src = eye;
    }
  };

  const savePassword = () => {
    console.log(form);
    setpasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]"></div>
      <div className="myContainer px-40">
        <h1 className="text-center font-bold text-3xl cursor-pointer">
          <span className="text-white">&lt;</span>
          <span className="text-orange-500">Drop</span>
          <span className="text-blue-600">Pin</span>
          <span className="text-white">/&gt;</span>
        </h1>
        <p className="text-orange-300 text-center text-lg font-semibold">
          Your own Password manager
        </p>
        <div className="flex flex-col p-4 items-center">
          <input
            placeholder="Enter website URL"
            value={form.site}
            name="site"
            onChange={handleChange}
            type="text"
            className="bg-white rounded-full border-orange-800 p-1 w-1/2"
          />
          <div className="p-4 mx-auto justify-between flex w-1/2">
            <input
              placeholder="Enter Username"
              value={form.username}
              name="username"
              onChange={handleChange}
              type="text"
              className="bg-white rounded-full p-1"
            />
            <div className="relative">
              <input
                placeholder="Enter password"
                value={form.password}
                name="password"
                onChange={handleChange}
                type="text"
                className="bg-white rounded-full p-1"
              />
              <span
                className="absolute right-0 inline-flex items-center gap-1 cursor-pointer"
                onClick={showPassword}
              >
                <img src={eye} ref={ref} className="w-6 h-6" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="group text-black font-bold
          bg-blue-600 w-fit rounded-full px-4 py-1 duration-500 border-2 border-green-600 flex justify-center text-center cursor-pointer"
          >
            <img
              src={saveIcon}
              alt=""
              className="w-6 h-6 group-hover:animate-bounce"
            />
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4 text-white">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="font-bold text-red-500">No passwords to show.</div>
          )}
          {passwordArray.length !== 0 && (
            <table className="table-auto text-white w-full rounded-xl overflow-hidden">
              <thead className="bg-slate-600 text-black">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                </tr>
              </thead>
              <tbody className="bg-slate-950">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-1 text-center min-w-50">
                        <a href={item.site} target="_blank">{item.site}</a>
                      </td>
                      <td className="py-1 text-center min-w-50">
                        {item.username}
                      </td>
                      <td className="py-1 text-center min-w-50">
                        {item.password}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
