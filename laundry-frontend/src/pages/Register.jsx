import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "CUSTOMER",
  });

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", form);
      alert(res.data);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Register</h2>

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

      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="CUSTOMER">Customer</option>
        <option value="PROVIDER">Provider</option>
        <option value="ADMIN">Admin</option>
      </select>

      <br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
