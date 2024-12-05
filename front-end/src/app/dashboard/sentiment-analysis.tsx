import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SentimentAnalysis(){
    const placeholders = [
        "What has been the highlight of your day so far?",
        "Did anything make you feel stressed or upset today?",
        "What’s something that brought you joy recently?",
        "If you could sum up your mood in one sentence, what would it be?",
        "What thoughts are running through your mind right now?",
        "Is there anything that’s been bothering you lately?",
      ];
    const [animateOut, setAnimateOut] = useState(false);
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
      };
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        animateOut && setAnimateOut(false);
        setTimeout(() => {
          setAnimateOut(true);
        }, 1600);
      };

    return (
    <div>
    <motion.div
        initial={{y: 100 }}
        animate={animateOut ? {y: -200 } : {y: 0 }}
        transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
        }}
    className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        How are you feeling today?
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </motion.div>
    </div>
    )
}