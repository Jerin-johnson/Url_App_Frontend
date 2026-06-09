import CreateUrlForm from "../components/CreateUrlForm";
import UrlTable from "../components/UrlTable";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
          <div>
            <h1 className="font-bold text-xl">URL Shortener</h1>
          </div>

          <div className="flex gap-4 items-center">
            <span>{user?.email}</span>

            <button
              onClick={handleLogout}
              className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <CreateUrlForm />

        <div className="mt-8">
          <UrlTable />
        </div>
      </main>
    </div>
  );
}
