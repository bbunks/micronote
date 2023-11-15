import { useEffect } from "react";
import { resetHeader, showProfile } from "../../../stores/HeaderSettingsStore";
import { Link, useNavigate } from "@tanstack/react-router";
import AuthService from "../../../services/AuthService";
import { Card } from "../../../components/input/Card";

export function LogoutPage() {
  useEffect(() => {
    showProfile(false);
    return resetHeader();
  }, []);
  const navigate = useNavigate({ from: "/logout" });

  useEffect(() => {
    AuthService.logout().then(() => {
      setTimeout(() => navigate({ to: "/login", replace: true }), 2000);
    });
  }, [navigate]);

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
