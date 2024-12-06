import { Button } from "@/components/ui/button";
import { IconArrowBack } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-scree flex flex-col">
      {/* Back Button */}
      <div className="p-5">
        <div className="flex items-center">
          <Button
            className="rounded-full hover:bg-gray-600"
            onClick={() => navigate("/dashboard/home")}
          >
            <IconArrowBack />
          </Button>
        </div>
      </div>

      {/* Edit Profile Section */}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-purple-500">
          <h1 className="text-center text-3xl font-bold mb-8">Edit Profile</h1>
          <form>
            {/* First Name and Last Name */}
            <div className="flex justify-between gap-4 mb-4 ">
              <div className="flex flex-col w-1/2">
                <label htmlFor="firstName" className="text-sm mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-100"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="lastName" className="text-sm mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-100"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-100"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="text-sm mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-100"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                onClick={() => navigate("/dashboard/home")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
