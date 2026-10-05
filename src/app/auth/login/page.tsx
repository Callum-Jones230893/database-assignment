import LoginForm from "@/components/forms/Login";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col m-auto">
      <h2 className="heading my-4 text-center">Login</h2>
      <div className="flex flex-col">
        <LoginForm />
        <div className="flex flex-col">
          <span>Don't have an account?</span>
          <Link href="/auth/signup">
            <span className="font-bold">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
