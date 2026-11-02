import SignUpForm from "@/components/forms/SignUp";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col mt-20">
      <h2 className="subtitle my-4 text-center">Sign up</h2>
      <div className="flex flex-col">
        <SignUpForm />
        <div className="flex flex-col items-center justify-center">
          <span>Already have an account?</span>
          <Link href="/auth/login">
            <span className="font-bold">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
