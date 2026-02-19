// src/context/authProvider.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import AuthContext from "./authContextValue";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("🔄 AuthContext: Firebase user:", firebaseUser?.email);

      if (!firebaseUser) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        let role = "user";
        let displayName = firebaseUser.displayName || "";

        if (snap.exists()) {
          const data = snap.data();
          role = data.role || "user";
          displayName = data.displayName || displayName;
        }

        const fullUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName,
          role,
          isAdmin: role === "admin",
        };

        console.log("✅ AuthContext FULL USER:", fullUser);

        setUser(fullUser);
        setIsAdmin(fullUser.isAdmin);
      } catch (error) {
        console.error("🔄 AuthContext Firestore error:", error);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: "user",
          isAdmin: false,
        });
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const value = {
    user,
    isAdmin,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
