import {
  Sidebar,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  ChevronUp,
  History,
  Home,
  Inbox,
  MessageSquare,
  User2,
} from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const items = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/dashboard/home",
  },
  {
    title: "History",
    icon: History,
    url: "/dashboard/history",
  },
  {
    title: "Forum",
    icon: MessageSquare,
    url: "/dashboard/forum",
  },
  {
    title: "Inbox",
    icon: Inbox,
    url: "/dashboard/inbox",
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      ></link>
      <Sidebar>
        <SidebarHeader />
        <SidebarGroupLabel>
          <div className="text-3xl mx-3">Mood Bridge</div>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </SidebarGroupLabel>
        <div className="my-auto mx-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="my-2">
                    <Link to={item.url}>
                      <div className="flex align-center">
                        <item.icon />
                      </div>
                      <text className="flex align-center font-semibold text-lg pb-1 ml-8">
                        {item.title}
                      </text>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {userData.first_name}, {userData.last_name}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] space-y-1 mb-3"
                >
                  <DropdownMenuItem>
                    <button
                      onClick={() => {
                        navigate("/dashboard/account");
                      }}
                    >
                      Account
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={handleSignOut}>Sign out</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
