import { useState } from "react";
import { Button } from "../../../components/input/Button";
import { TextInput } from "../../../components/input/TextInput";
import AuthService from "../../../services/AuthService";
import { decodeJWT } from "../../../utils/JWT";
import { JwtTokenWatcher } from "../../../stores/AuthStore";

export function TestPage() {
  const [jwtState, setJwtState] = useState("");
  const [reqURL, setReqURL] = useState("");
  let decode = decodeJWT(jwtState);
  let exp = "";
  let iat = "";

  let date = new Date(0);

  if (decode.iat) {
    date.setUTCSeconds(decode.iat);
    iat = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  date = new Date(0);
  if (decode.exp) {
    date.setUTCSeconds(decode.exp);
    exp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  return (
    <div>
      <TextInput
        inputLabel="Request URL"
        className="m-8"
        inputClassName="bg-white"
        onChange={(e) => setReqURL(e.target.value)}
        value={reqURL}
      />
      <Button
        onClick={() => {
          AuthService.generateToken(
            "brendenbunker@gmail.com",
            "test123",
            (token) => {
              console.log(token);
              JwtTokenWatcher.value = token;
            }
          );
        }}
      >
        gmail
      </Button>
      <Button
        onClick={() => {
          AuthService.generateToken(
            "brenden@bbunks.com",
            "test123",
            (token) => {
              console.log(token);
              JwtTokenWatcher.value = token;
            }
          );
        }}
      >
        bbunks
      </Button>
      <Button
        onClick={() => {
          AuthService.makeAuthorizedRequest(reqURL)
            .then((res) => res.json())
            .then((res) => console.log(res));
        }}
      >
        Make Request
      </Button>

      <TextInput
        lineCount={3}
        className="bg-white m-8"
        onChange={(e) => setJwtState(e.target.value)}
        value={jwtState}
      />
      <Button variant="PrimaryInverse">Decode</Button>
      <p>IAT: {iat}</p>
      <p>EXP: {exp}</p>
    </div>
  );
}
