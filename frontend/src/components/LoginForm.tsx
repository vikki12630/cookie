import { ChangeEvent, FC, FormEvent, useState } from "react"
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (identifier: string, password: string) => void
}

type inputData = {
  identifier: string;
  password: string;
};

const LoginForm: FC<LoginFormProps> = ({onSubmit}) => {

  const [formData, setFormData] = useState<inputData>({
    identifier: "",
    password: "",
  })

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (formData.identifier && formData.password) {
      onSubmit(formData.identifier, formData.password)
    }else{
      console.log("enter both id and password")
    }
  }

  return (
    <form onSubmit={loginFormSubmit} className="flex flex-col gap-3 text-gray-950">
      <label htmlFor="identifier" className="hidden" />
      <input
        type="text"
        placeholder="username or email"
        id="identifier"
        name="identifier"
        value={formData.identifier}
        onChange={inputHandler}
        className="text-xl py-2 px-3 rounded-md text-center placeholder:text-gray-400"
      />
      <label htmlFor="password" className="hidden" />
      <input
        type="password"
        placeholder="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={inputHandler}
        className="text-xl py-2 px-3 rounded-md text-center placeholder:text-gray-400"
      />
      <div className="flex flex-col">
        <button
          type="submit"
          className="text-xl py-2 px-3 rounded-md bg-slate-900 text-white"
        >
          Login
        </button>
        <Link to={"/signup"} className="text-right text-s text-gray-500">
          Don't have an account{" "}
          <span className="text- font-bold hover:underline">Signup</span>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm