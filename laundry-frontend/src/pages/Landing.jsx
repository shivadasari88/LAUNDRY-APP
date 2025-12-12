import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Laundry Management Application</h1>
      <p>Please choose an option</p>

      <Link to="/register" style={{ marginRight: "20px" }}>
        <button>Register</button>
      </Link>

      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
