import React, { useState, useEffect } from "react";
import axiosInstance from "../API/AxiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState({});

  const [dataCheck, setDataCheck] = useState(false);
  const [process, setprocess] = useState(false);
  const { email, password } = input;
  const Inputfield = [
    {
      name: "email",
      value: email,
      placeholder: "Email",
      type: "text",
      validation: error.email,
    },
    {
      name: "password",
      value: password,
      placeholder: "Password",
      type: "password",
      validation: error.password,
    },
  ];
  const Handelchange = (e) => {
    const { name, value } = e.target;
    setinput((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const Validation = (data) => {
    const errors = {};
    if (!data.password) {
      errors.password = "Password Field is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be atleast eight characters";
    }
    if (
      !data.email.match(
        /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
      )
    ) {
      errors.email = "Invalid email address.";
      // error = false;
    }

    return errors;
  };
  const Handelsubmit = (e) => {
    e.preventDefault();
    seterror(Validation(input));
    setDataCheck(true);
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && dataCheck) {
      setprocess(true);
      axiosInstance
        .post("user/login", { email, password })
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            setinput({
              username: "",
              email: "",
              password: "",
            });
            localStorage.setItem("token", res.data.token);
            window.location.assign("/");
          } else {
            console.log(res.data.error);
            toast.error(res.data.error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }

          setprocess(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setprocess(false);
        });
    }
    setDataCheck(false);
  }, [dataCheck]);
  return (
    <div className="w-full bg-blue-100 min-h-screen  flex justify-center items-center">
      <form
        onSubmit={Handelsubmit}
        className="flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg gap-3 w-11/12 sm:w-8/12 md:w-4/12"
      >
        <h1 className="text-3xl font-medium text-gray-700">Sign In</h1>
        <Link to={"/register"} className="text-blue-500 text-sm">
          Do not have an account?
        </Link>
        {Array.isArray(Inputfield) &&
          Inputfield.map((data, index) => {
            const { name, value, placeholder, type, validation } = data;
            return (
              <div key={index} className="w-full">
                <div className="text-base text-left font-medium text-gray-500">
                  {placeholder}
                </div>
                <input
                  onChange={Handelchange}
                  type={type}
                  value={value}
                  name={name}
                  placeholder={placeholder}
                  className="h-10 border  border-gray-300 w-full focus:shadow text-gray-600 focus:outline-none px-2 rounded"
                />
                {validation && (
                  <div className="bg-red-500 relative text-white rounded mt-1 text-sm text-center">
                    <p> {validation}</p>
                    <div className="h-2 w-2 left-3 transform rotate-45 -top-1 absolute bg-red-500"></div>
                  </div>
                )}
              </div>
            );
          })}

        <div className="w-full">
          <button
            type="submit"
            disabled={process ? true : false}
            className={`bg-blue-500 flex items-center justify-center gap-2 h-10 w-36 hover:bg-blue-400 self-center transition duration-300 py-2 px-8 float-right rounded text-white font-medium text-sm ${
              process ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {process ? (
              <span className="lds-ring mx-auto mb-3">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </span>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signin;
