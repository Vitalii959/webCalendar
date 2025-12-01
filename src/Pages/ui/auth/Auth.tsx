import "./auth.css";
import {auth} from "@/shared/lib/firebase/config";
import {Button} from "@/shared/ui/Button";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously
} from "firebase/auth";
import {useNavigate} from "react-router";

import loginImg from "@/assets/login-img.png";

export const Auth = () => {
  const navigate = useNavigate();

  const handleLoggin = async (method: "google" | "guest") => {
    const provider = new GoogleAuthProvider();
    if (method === "guest") {
      try {
        const result = await signInAnonymously(auth);
        if (result.user) navigate("/calendar");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const result = await signInWithPopup(auth, provider);
        if (result.user) navigate("/calendar");
      } catch (error) {
        throw new Error("can not login");
        console.error(error);
      }
    }
  };

  return (
    <div className='loginPage'>
      <div className='loginWrapper'>
        <div className='login-section'>
          <h1 className='login-title'>Web calendar</h1>
          <h2 className='login-subtitle'>
            React • TypeScript • Firebase • Zustand
          </h2>
          <div className='login-btn'>
            <Button
              options='secondary'
              onClick={() => handleLoggin("google")}
              icon='google'
            >
              Login with google
            </Button>
          </div>
          <div className='login-btn'>
            <Button options='secondary' onClick={() => handleLoggin("guest")}>
              Login as Guest
            </Button>
          </div>
          <div className='login-links'>
            <a href='https://github.com/Vitalii959/webCalendar'>GitHub</a>
            <a href='https://linkedin.com/in/vitalii-vyhonnyi-2028aa324'>
              LinkedIn
            </a>
          </div>
        </div>
        <div className='login-img'>
          <img src={loginImg} alt='' />
        </div>
      </div>
    </div>
  );
};
