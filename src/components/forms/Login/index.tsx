"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Login } from "../../../../actions/login-action";
import { loginSchema } from "../../../../actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: Login,
  })
  console.log("mutation error", error)

  return (
    <div>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col w-md m-auto p-10 border border-black rounded-2xl mb-4">
        <label htmlFor="email">Enter your email</label>
        <input {...register("email")} placeholder="Email..." className="input" />
        {errors.email && <ErrorMessage error={errors.email.message!}/>}

        <label htmlFor="password">Enter a password</label>
        <input {...register("password")} type="password" placeholder="Password..." className="input" />
        {errors.password && <ErrorMessage error={errors.password.message!} />}

        <button className="button cursor-pointer">Login</button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
