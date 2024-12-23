import { WavyBackground } from "@/components/ui/wavy-background";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import Login from "./login";

export default function Welcome() {
  const [animateOut, setAnimateOut] = useState(false);
  const [isActive, setIsActive] = useState({
    first: true,
    second: false,
    third: false,
  });

  const onGetStarted = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setIsActive({ first: false, second: true, third: false });
      setAnimateOut(false);
    }, 1600);
  };
  return (
    <WavyBackground
      className="max-w-4xl mx-auto"
      colors={["#6528F7", "#A076F9", "#D7BBF5", "#EDE4FF"]}
    >
      {isActive.first && (
        <motion.div>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            animate={animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center"
          >
            Mood Bridge
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            animate={animateOut ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              ease: "easeInOut",
            }}
            className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center"
          >
            Cross the bridge to a better understanding of yourself.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            animate={animateOut ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="flex items-center text-center justify-center"
          >
            <Button
              className=" min-w-96 md:text-2xl py-5  bg-slate-800 mt-4 text-white"
              onClick={onGetStarted}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      )}
      {isActive.second && <Login />}
    </WavyBackground>
  );
}
