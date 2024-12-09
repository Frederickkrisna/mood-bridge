import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { IconArrowBack } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Fred from "@/assets/fred.jpg";
import Wili from "@/assets/wili.jpg";
import Lavi from "@/assets/lavi.jpg";
import Aaron from "@/assets/aaron.jpg";

export default function Aboutus(){
  const navigate = useNavigate();
  const testimonials = [
    {
      quote:
        "Mintalah maka akan diberikan kepadaMu. Makanlah maka akan kenyang.",
      name: "Frederick Krisna S",
      designation: "Frontend Developer",
      src: Fred,
    },
    {
      quote:
        "Sepandai-pandainya Tupai melompat, yang penting lompat aja lah.",
      name: "William Theodorus W",
      designation: "Backend Developer",
      src: Wili,
    },
    {
      quote:
        "Berjalanlah dengan iman, bukan dengan melihat. - 2 Korintus 5:7",
      name: "Lavinia Nataniela N",
      designation: "UI/UX Designer",
      src: Lavi,
    },
    {
      quote:
        "Kegagalan bukan akhir dari segalanya, melainkan kesempatan untuk tumbuh dan belajar.",
      name: "Vincentius Aaron",
      designation: "Business Analyst",
      src: Aaron,
    },
  ];
  return (
    <div className="w-full h-full">
      <div className="flex items-start w-screen fixed  ml-5 mt-5">
          <Button
            className="rounded-full"
            onClick={() => navigate("/dashboard/home")}
          >
            <IconArrowBack />
          </Button>
        </div>
      <h2 className="py-14 max-w-7xl pl-4 mx-auto text-xl text-center md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Our Team
      </h2>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
);
}