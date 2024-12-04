import { motion } from "framer-motion";
import { useState } from "react";
import Login from "./login";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [animateOut, setAnimateOut] = useState(false);
  const [isActive, setIsActive] = useState({
    login: false,
    register: true,
  });

  const renderLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnimateOut(true);
    setTimeout(() => {
      setIsActive({ login: true, register: false });
      setAnimateOut(false);
    }, 1600);
  };

  const storeUserData = async (e: React.MouseEvent) => {
    try {
      const docRef = await setDoc(doc(db, "MsUser", email), {
        userId: uuidv4(),
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });
      console.log("Document written: ", docRef);
      alert("Account created successfully");
      renderLogin(e);
    } catch (exception) {
      console.log("Error adding document: ", exception);
    }
  };

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    } else if (!email.endsWith("@gmail.com")) {
      alert("Please enter a valid email address");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await storeUserData(e);
    } catch (exception) {
      console.log("Error creating user: ", exception);
      alert("Error creating user");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="flex items-center text-center justify-center text-white"
    >
      {isActive.register && (
        <div className="w-screen h-screen flex justify-center items-center">
          <form className="form-content p-5 min-w-[50vh] rounded-lg border-r-boxShadow-input backdrop-blur-2xl border border-slate-700">
            <div className="font-semibold text-3xl pb-5 w-full text-center text-background text-white">
              Register
            </div>
            <div className="form-group pb-5 w-full flex flex-row space-x-4">
              <input
                type="text"
                id="formFirstName"
                placeholder="First Name"
                className="p-2 rounded-lg bg-bluefield text-black w-1/2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                id="formLastName"
                placeholder="Last Name"
                className="p-2 rounded-lg bg-bluefield text-black w-1/2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="email"
                id="formEmail"
                placeholder="Email"
                className="p-2 rounded-lg bg-bluefield text-black w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="password"
                id="formPassword"
                placeholder="Password"
                className="p-2 rounded-lg bg-bluefield text-black w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="password"
                id="formConfirmPassword"
                placeholder="Confirm Password"
                className="p-2 rounded-lg bg-bluefield text-black w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="flex pt-1 mb-1">
                <div className="pr-2 text-sm text-background text-white">
                  Already have an account?
                </div>
                <button
                  onClick={renderLogin}
                  className="text-white text-sm underline"
                >
                  Sign in
                </button>
              </div>
              <button
                onClick={handleRegister}
                type="button"
                className=" rounded-xl bg-slate-800 text-white font-semibold min-w-[20rem] w-full p-2 hover:text-slate-50 items-center justify-center"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      )}
      {isActive.login && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <Login />
        </motion.div>
      )}
    </motion.div>
  );
}
