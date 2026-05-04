import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h3>Welcome {user?.name}</h3>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
