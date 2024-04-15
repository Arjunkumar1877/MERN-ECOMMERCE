import { useState } from "react";
import "./CSS/LoginSignup.css";

function LoginSignup() {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    console.log("login clicked");
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const responseData = await res.json();

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      console.log(responseData);
      window.location.replace("/");
    } else {
      alert(responseData.error);
      console.log(responseData);
    }
  };

  const handleSignup = async () => {
    console.log("signup clicked");
    const res = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const responseData = await res.json();

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      console.log(responseData);
      window.location.replace("/");
    } else {
      alert(responseData.error);
      console.log(responseData);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1 className="">{state}</h1>
        <div className="loginsignup-fields">
          {state === "Signup" ? (
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <button onClick={state === "Login" ? handleLogin : handleSignup}>
          Continue
        </button>
        {state === "Signup" ? (
          <p className="loginsignup-login" onClick={() => setState("Login")}>
            Already have an account ? <span>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login" onClick={() => setState("Signup")}>
            Don't have an account ? <span>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
