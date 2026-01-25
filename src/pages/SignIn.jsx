import { Form, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { loginUser } from "../services/authServices";

function SignIn() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);
      login(data.user, data.user.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign-in">
      <h5>Sign In</h5>
      <Form onSubmit={handleSignIn}>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </Form>
      {error && <p className="sign-in-error">{error}</p>}
    </div>
  );
}

export default SignIn;
