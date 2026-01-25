import { useAuth } from "../context/AuthContext";
import { Form, redirect, Navigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authServices";

function SignUp() {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (username.length < 3 || username.length > 20) {
      setError("Username must contain at least 3 symbols and less then 20");
      return;
    }
    if (password.length < 6 || password.length > 40) {
      setError("Password must contain at least 6 symbols and less then 40");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password doesn't match");
      return;
    }
    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    try {
      const data = await registerUser(username, email, password);
      login(data.user, data.user.token);
      return redirect("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="sign-up">
      <h5>Sign Up</h5>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="confirm-password"
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="sign-up-btm">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            I agree to the terms and conditions
          </label>
          <button type="submit">Submit</button>{" "}
        </div>{" "}
        {error && <p className="sign-up-error">{error}</p>}
      </Form>
    </div>
  );
}

export default SignUp;
