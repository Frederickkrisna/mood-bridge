import { WavyBackground } from "@/components/ui/wavy-background";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <WavyBackground
      className="max-w-4xl mx-auto"
      colors={["#B6FFFA", "#98E4FF", "#80B3FF", "#687EFF"]}
    >
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex items-center text-center justify-center"
      >
        <div className="w-screen h-screen flex justify-center items-center">
          <form className="form-content p-5 min-w-[40vh] rounded-lg border-r-boxShadow-input bg-gradient-to-tr from-violet-400 to-violet-600">
            <div className="font-semibold text-xl pb-5 w-full text-center text-background">
              Sign In
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="email"
                id="formEmail"
                placeholder="email"
                className="p-2 rounded-lg bg-bluefield text-black w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group pb-5 min-w-[20rem]">
              <input
                type="password"
                id="formPassword"
                placeholder="password"
                className="p-2 rounded-xl bg-bluefield text-black w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="flex pt-1 mb-1">
                <div className="pr-2 text-sm text-background">
                  Dont have an account?
                </div>
                <Link to="/register" className="text-white text-sm underline">
                  Register here
                </Link>
              </div>
              <button
                onClick={() => console.log("Login")}
                type="button"
                className=" rounded-xl bg-slate-800 text-background font-semibold min-w-[20rem] w-full p-2 hover:bg-background hover:text-black items-center justify-center"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </WavyBackground>
  );
}
