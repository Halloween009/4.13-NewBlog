import { Form } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Settings() {
  const { user, update } = useAuth();
  const [error, setError] = useState("");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    const data = {
      username,
      email,
      image,
    };

    try {
      await update(data);
    } catch (error) {
      setError("Couldn't update user data.");
      console.error("Couldn't update user data.", error);
    }
  };

  return (
    <div className="settings">
      <h5>Your Settings</h5>
      <Form onSubmit={handleUpdate}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="url"
          name="url"
          placeholder="Avatar image(URL)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div>
          <button>Update Settings</button>
          <button className="logoutBtn">Log out</button>
        </div>
      </Form>
      {error && <p className="update-error">{error}</p>}
    </div>
  );
}

export default Settings;
