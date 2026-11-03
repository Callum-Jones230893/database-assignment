"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Login } from "../../../../actions/login-action";
import { loginSchema } from "../../../../actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import Image from 'next/image'
import loginIcon from "@/public/images/icons/login.png"

const LoginForm = () => {
  
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const { mutate, error, data } = useMutation({
    mutationFn: Login,
  })

  return (
    <div>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="post-form">
        <label htmlFor="email" className="field-header">Enter your email</label>
        <input {...register("email")} placeholder="Email..." className="input" />
        {errors.email && <ErrorMessage error={errors.email.message!}/>}

        <label htmlFor="password" className="field-header">Enter a password</label>
        <input {...register("password")} type="password" placeholder="Password..." className="input" />
        {errors.password && <ErrorMessage error={errors.password.message!} />}

        <button className="flex justify-center">
          <Image src={loginIcon} alt="Login" height={100} width={100} className="icons"/>
        </button>
        {data?.error && <ErrorMessage error={data.error} />}
      </form>
    </div>
  );
};

export default LoginForm;
