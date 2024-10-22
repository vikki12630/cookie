import LoginForm from "../components/LoginForm";
import { handleLogin } from "../api/userApi";
import { useAppDispatch } from "../reduxAuth_Slices/store";


const Login = () => {
  const dispatch = useAppDispatch()
  const onSubmit = (identifier: string, password: string) => {
    handleLogin(dispatch, identifier, password);
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-950">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}

export default Login