import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/authSlice";
import { validateSignup } from "../utils/validation";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    // company: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [showPass, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    // 🔥 Validate first
    const errors = validateSignup(form);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = await dispatch(signupUser(form));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  const toggleShowPass = () => {
    setShowPassword(!showPass);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>

        <button className="auth-secondary-btn">Continue with Google</button>
        <button className="auth-secondary-btn">Continue with SSO</button>

        <div className="auth-divider">Or continue with email</div>

        <input
          name="name"
          className="auth-input"
          placeholder="Full Name"
          onChange={handleChange}
        />
        {formErrors.name && <p className="error">{formErrors.name}</p>}

        <input
          name="email"
          className="auth-input"
          placeholder="Work Email"
          onChange={handleChange}
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}

        {/* <input
          name="company"
          className="auth-input"
          placeholder="Company Name"
          onChange={handleChange}
        />
        {formErrors.company && <p className="error">{formErrors.company}</p>} */}
        <div className="auth-input-password">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            className="auth-input"
            placeholder="Password"
            onChange={handleChange}
          />
          <span className="show_password" onClick={toggleShowPass}>
            {showPass ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z" />
              </svg>
            )}
          </span>
          {formErrors.password && (
            <p className="error">{formErrors.password}</p>
          )}
        </div>

        {error && <p className="error">{error}</p>}

        <button
          className="auth-button"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
