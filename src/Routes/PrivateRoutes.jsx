import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <PulseLoader color="#7091F5" size={25} />
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace></Navigate>;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
