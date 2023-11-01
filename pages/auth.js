import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p className={""}>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
