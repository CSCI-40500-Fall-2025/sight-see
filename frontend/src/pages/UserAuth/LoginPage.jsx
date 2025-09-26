import { useNavigate } from "react-router-dom";
import { UserNameInput, PasswordInput, Button } from "../../components";

const loginButtonClicked = () => {
  {
      /** Send info to server here */
  }

  if (true) {
      onSuccessfulLogin();
  }
};

export default function LoginPage() {
  let navigate = useNavigate();

  {
    /* Logic for when authentication is good. Empty for now */
  }
  const onSuccessfulLogin = () => {
    {
        /** Store credentials here */
    }

    navigate("/main");
  };

  {
    /* Login button click logic. Empty for now */
  }

  //  TODO: Username and Password should not have hints
  const LoginFieldset = (props) => {
    return (
      <div className="w-full max-w-md px-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend text-4xl font-bold">Log In</legend>
              <UserNameInput/>
              <PasswordInput/>
              <Button
                title="Log In"
                func={() => navigate("/main")}
                className="mb-2 w-full btn-neutral"
              ></Button>
              <Button
                title="Go Back"
                func={() => navigate("/")}
                className="mb-2 w-full btn-soft"
              ></Button>
        </fieldset>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <LoginFieldset/>
      {/* TODO: Add way to reset password*/}
    </div>
  );
}
