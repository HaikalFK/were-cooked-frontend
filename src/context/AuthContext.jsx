import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  /**
   * Menangani logika setelah login berhasil.
   * Menyimpan data dan mengarahkan pengguna ke halaman yang sesuai.
   */
  const login = (userData, tokenData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    setUser(userData);
    setToken(tokenData);

    // Logika navigasi terpusat:
    // Cek respons dari backend
    if (!userData.has_set_preferences) {
      // Jika pengguna baru, arahkan ke halaman pengaturan preferensi.
      navigate("/set-preferences");
    } else {
      // Jika pengguna lama, arahkan ke halaman utama.
      navigate("/");
    }
  };

  /**
   * Menangani logika logout.
   */
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  /**
   * Memperbarui data pengguna di seluruh aplikasi setelah edit profil.
   * Ini adalah implementasi dari rekomendasi perbaikan kita.
   */
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  useEffect(() => {
    // Sinkronisasi antar tab browser
    const syncAuth = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
            {children}   {" "}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
