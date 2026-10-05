"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp } from "../../../../actions/signup-action";
import { signUpSchema } from "../../../../actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

const SignUpForm = () => {

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: SignUp,
  })
  console.log("mutation error", error)

  return (
    <div>
      <form  onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col w-md m-auto p-10 border border-sushi rounded-2xl mb-4">
        <label htmlFor="username">Enter a username</label>
        <input {...register("username")} placeholder="Username..." className="input" />
        {errors.username && <ErrorMessage error={errors.username.message!} />}

        <label htmlFor="email">Enter your email</label>
        <input {...register("email")} placeholder="Email..." className="input" />
        {errors.email && <ErrorMessage error={errors.email.message!} />}

        <label htmlFor="password">Enter a password</label>
        <input {...register("password")} type="password" placeholder="Password..." className="input" />
        {errors.password && <ErrorMessage error={errors.password.message!} />}

        <button className="button cursor-pointer">Signup</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default SignUpForm;
