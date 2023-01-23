import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";
import { client } from "../client";
import shareVideo from "../assets/share.mp4";
import particles from '../assets/particles.mp4'
import logo from "../assets/logowhite.png";

const Login = () => {
  const navigate = useNavigate();

  const onSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    localStorage.setItem("user", JSON.stringify(decoded));
    
    const { name, sub, picture } = decoded;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  const onError = () => {
    console.log("it failed");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video
            src={particles}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="object-cover w-full h-full"
          />
          <div className="absolute flex flex-col justify-around items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay/50">
            <div className="p-5">
              <img src={logo} alt="logo" />
            </div>
            <div className="shadow-2xl" id="signInDiv">
              <GoogleLogin onSuccess={onSuccess} onError={onError} />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
