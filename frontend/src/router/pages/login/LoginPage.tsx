import { useEffect, useState } from "react";
import { Card } from "../../../components/input/Card";
import { TextInput } from "../../../components/input/TextInput";
import { Button } from "../../../components/input/Button";
import { resetHeader, showProfile } from "../../../stores/HeaderSettingsStore";
import { useNavigate } from "@tanstack/react-router";
import AuthService from "../../../services/AuthService";
import { JwtTokenWatcher } from "../../../stores/AuthStore";
import { useWatcherState } from "react-state-extended";
import { isTokenExpired } from "../../../utils/JWT";

export function LoginPage() {
  useEffect(() => {
    showProfile(false);
    return resetHeader();
  }, []);
  const navigate = useNavigate({ from: "/login" });

  const [jwtToken] = useWatcherState(JwtTokenWatcher);

  useEffect(() => {
    if (jwtToken && !isTokenExpired(jwtToken)) {
      navigate({ to: "/app" });
    }
  }, [jwtToken, navigate]);

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
        <Button
          onClick={() => {
            AuthService.generateToken(username, password, (token) => {
              JwtTokenWatcher.value = token;
              navigate({ to: "/app" });
            });
          }}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
