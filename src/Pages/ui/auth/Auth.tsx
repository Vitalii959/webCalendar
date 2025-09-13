import "./auth.css";
import {auth} from "@/shared/lib/firebase/config";
import {Button} from "@/shared/ui/Button";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router";

export const Auth = () => {
  const navigate = useNavigate();

  const handleLoggin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) navigate("/calendar");
    } catch (error) {
      throw new Error("can not login");
      console.error(error);
    }
  };

  return (
    <div className='loginPage'>
      <div className='loginWrapper'>
        <Button options='primary' onClick={handleLoggin}>
          Loggin
        </Button>
      </div>
    </div>
  );
};
