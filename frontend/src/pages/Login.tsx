import LoginForm from "../components/LoginForm";
import { handleLogin } from "../api/userApi";
import { useAppDispatch } from "../reduxAuth_Slices/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (identifier: string, password: string) => {
    handleLogin(dispatch, identifier, password, navigate);
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
