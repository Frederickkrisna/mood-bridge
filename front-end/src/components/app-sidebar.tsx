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
import { useTheme } from "./theme-provider";

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
  const { theme } = useTheme();
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
      <Sidebar collapsible="none" className="flex flex-col h-screen border-r-2">
        <SidebarHeader />
        <SidebarGroupLabel>
          <div className="text-3xl">Mood Bridge</div>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </SidebarGroupLabel>
        <div className="mt-5 mx-3 flex-grow h-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="my-1">
                    <Link to={item.url}>
                      <div className="flex align-center">
                        <item.icon />
                      </div>
                      <text className="flex align-center font-semibold text-sm pb-1 ml-8">
                        {item.title}
                      </text>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
        <div className="mt-auto">
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="font-semibold text-lg h-auto">
                      <User2 /> {userData.first_name} {userData.last_name}
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width] space-y-1 mb-3 rounded-lg"
                  >
                    <DropdownMenuItem>
                      <button
                        onClick={() => {
                          navigate("/dashboard/account");
                        }}
                        className={`text-right ${
                          theme === "light"
                            ? "hover:bg-slate-100"
                            : "hover:bg-slate-800"
                        } min-w-full px-2 rounded-sm`}
                      >
                        Account
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={handleSignOut}
                        className={`text-right ${
                          theme === "light"
                            ? "hover:bg-slate-100 "
                            : "hover:bg-slate-800 "
                        } min-w-full px-2 rounded-sm text-red-600 font-bold`}
                      >
                        Log out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </div>
      </Sidebar>
    </>
  );
}
