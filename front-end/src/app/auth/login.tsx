import { WavyBackground } from "@/components/ui/wavy-background";

import { motion } from "framer-motion";

export default function Login() {
  return (
    <WavyBackground className="max-w-4xl mx-auto">
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
          <form className="form-content p-5 min-w-[40vh] rounded-lg border-r-boxShadow-input bg-gradient-to-r from-violet-900 to-blue-700">
            <div className="font-semibold text-xl pb-5 w-full text-center text-background">
              Sign In
            </div>
          </form>
        </div>
      </motion.div>
    </WavyBackground>
  );
}
