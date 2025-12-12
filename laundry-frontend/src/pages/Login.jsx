import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", form);
      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "CUSTOMER") navigate("/customer");
      if (user.role === "PROVIDER") navigate("/provider");
      if (user.role === "ADMIN") navigate("/admin");

    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
