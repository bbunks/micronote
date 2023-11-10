import { useState } from "react";
import { Button } from "../../../components/input/Button";
import { TextInput } from "../../../components/input/TextInput";
import AuthService from "../../../services/AuthService";
import { decodeJWT } from "../../../utils/JWT";

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
          AuthService.login("brendenbunker@gmail.com", "test123").then(
            (token) => {
              console.log(token);
            }
          );
        }}
      >
        gmail
      </Button>
      <Button
        onClick={() => {
          AuthService.login("brenden@bbunks.com", "test123").then((token) => {
            console.log(token);
          });
        }}
      >
        bbunks
      </Button>
      <Button
        onClick={() => {
          AuthService.refreshToken().then((token) => {
            console.log(token);
          });
        }}
      >
        Refresh Token
      </Button>
      <Button
        onClick={() => {
          AuthService.makeAuthorizedRequest(reqURL)
            .then((res) => {
              console.log(res);
              return res.json();
            })
            .then((json) => console.log(json));
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
