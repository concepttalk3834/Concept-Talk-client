import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-between items-center max-h-screen py-4 ">
      <div className="bg-white shadow-lg w-full max-w-full">
        {isLogin ? (
          <Login isLogin={isLogin} setIsLogin={setIsLogin} />
        ) : (
          <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
        )}
        {/* <p className="text-center my-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p> */}
      </div>
    </div>
  );
}
