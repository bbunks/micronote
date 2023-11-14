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

export function SignupPage() {
  useEffect(() => {
    showProfile(false);
    return resetHeader();
  }, []);
  const navigate = useNavigate({ from: "/login" });

  const [error, setError] = useState();

  const [authenticated] = useWatcherState(AuthenticatedWatcher);

  useEffect(() => {
    if (authenticated === AuthenticationState.Authorized) {
      navigate({ to: "/app" });
    }
  }, [authenticated, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="max-w-lg">
        <TextInput
          inputLabel="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextInput
          inputLabel="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error && <p className="text-error text-sm">{error}</p>}
        <Button
          onClick={() => {
            setError(undefined);
            AuthService.login(username, password)
              .then(() => navigate({ to: "/app" }))
              .catch((err) => {
                setError(err);
              });
          }}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
