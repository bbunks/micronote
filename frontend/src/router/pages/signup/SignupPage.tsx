import { useEffect, useState } from "react";
import { Card } from "../../../components/input/Card";
import { TextInput } from "../../../components/input/TextInput";
import { Button } from "../../../components/input/Button";
import { resetHeader, showProfile } from "../../../stores/HeaderSettingsStore";
import { useNavigate } from "@tanstack/react-router";
import AuthService from "../../../services/AuthService";
import {
  AuthenticatedWatcher,
  AuthenticationState,
} from "../../../stores/AuthStore";
import { useWatcherState } from "react-state-extended";
import { useForm } from "react-hook-form";
import { LoadingIndicator } from "../../../components/Loading";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function SignupPage() {
  useEffect(() => {
    showProfile(false);
    return () => resetHeader();
  }, []);
  const navigate = useNavigate({ from: "/login" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [error, setError] = useState();

  const [authenticated] = useWatcherState(AuthenticatedWatcher);

  useEffect(() => {
    if (authenticated === AuthenticationState.Authorized) {
      navigate({ to: "/app" });
    }
  }, [authenticated, navigate]);

  function submit(data: Inputs) {
    setError(undefined);
    AuthService.signup(data.firstName, data.lastName, data.email, data.password)
      .then(() => navigate({ to: "/app" }))
      .catch((err) => {
        setError(err);
      });
  }

  if (
    authenticated === AuthenticationState.Authorizing ||
    authenticated === AuthenticationState.Authorized
  )
    return (
      <div className="flex justify-center items-center p-16">
        <LoadingIndicator />
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <form
        className="w-full flex justify-center"
        onSubmit={handleSubmit(submit)}
      >
        <Card className="max-w-xs w-full">
          <TextInput
            {...register("firstName", { required: "Required" })}
            inputLabel="First Name"
            error={errors.firstName?.message}
          />
          <TextInput
            {...register("lastName", { required: "Required" })}
            inputLabel="Last Name"
            error={errors.lastName?.message}
          />
          <TextInput
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            inputLabel="Email"
            type="email"
            error={errors.email?.message}
          />
          <TextInput
            {...register("password", { required: "Required" })}
            inputLabel="Password"
            type="password"
            error={errors.password?.message}
          />
          {error && <p className="text-error text-sm">{error}</p>}
          <Button onClick={() => {}}>Sign Up</Button>
        </Card>
      </form>
      <div className="w-full flex justify-center">
        <Card className="max-w-xs w-full">
          <p>Already have an account?</p>
          <Button
            onClick={() => {
              navigate({ to: "/login" });
            }}
          >
            Sign In
          </Button>
        </Card>
      </div>
    </div>
  );
}
