import { Link, useNavigate, Navigate } from "react-router-dom";
import "../styles/auth.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    const result = await dispatch(loginUser(form));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to Project Intelligence</p>

        <input
          className="auth-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          className="auth-input"
          placeholder="Password"
          onChange={handleChange}
        />

        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
          }}
        >
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span>Forgot password?</span>
        </div>

        <button
          className="auth-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        <div className="auth-divider">OR</div>

        <button className="auth-secondary-btn">Continue with Google</button>
        <button className="auth-secondary-btn">Continue with SSO</button>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
