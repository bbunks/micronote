import { useEffect } from "react";
import { resetHeader, showProfile } from "../../../stores/HeaderSettingsStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { JwtTokenWatcher } from "../../../stores/AuthStore";
import { useWatcherState } from "react-state-extended";
import AuthService from "../../../services/AuthService";
import { Card } from "../../../components/input/Card";

export function LogoutPage() {
  useEffect(() => {
    showProfile(false);
    return resetHeader();
  }, []);
  const navigate = useNavigate({ from: "/logout" });

  const [jwtToken] = useWatcherState(JwtTokenWatcher);

  useEffect(() => {
    setTimeout(() => {
      AuthService.logout();
      navigate({ to: "/login" });
    }, 2000);
  }, [jwtToken, navigate]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="max-w-lg">
        <h2 className="text-xl">You have been logged out</h2>
        <p>
          You will be redirected now. If you are not, click{" "}
          <Link to="/">here</Link>
        </p>
      </Card>
    </div>
  );
}
