import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/app/components/ui/sonner";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}