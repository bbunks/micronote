import { useEffect } from "react";
import { Card } from "../../../components/input/Card";
import { TextInput } from "../../../components/input/TextInput";
import { Button } from "../../../components/input/Button";
import { resetHeader, showProfile } from "../../../stores/HeaderSettingsStore";
import { useNavigate } from "@tanstack/react-router";

export function LoginPage() {
  useEffect(() => {
    showProfile(false);
    return resetHeader();
  }, []);
  const navigate = useNavigate({ from: "/login" });

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="max-w-lg">
        <TextInput inputLabel="Username" />
        <TextInput inputLabel="Password" />
        <Button
          onClick={() => {
            navigate({ to: "/app" });
          }}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
