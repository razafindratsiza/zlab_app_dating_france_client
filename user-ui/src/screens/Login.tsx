'use client'

import React from 'react'

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '@/features/auth/authActions';
import { AppDispatch } from '@/redux/store';
const formSchema = z.object({
    email: z.string().email("veuillez entrez une adresse email valide"),
    password: z.string().min(8, "mot de passe incorect")
})



export type LoginSchema = z.infer<typeof formSchema>;
const Login = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginSchema>({
        resolver: zodResolver(formSchema)
    })


    const dispatch: AppDispatch = useDispatch();
    const submitForm = (data: LoginSchema) => {
        dispatch(userLogin(data))
        reset()
    }
    return (
        <div>
            <div className="">
                <h3 className='text-blue-600'>Se connecter</h3>
            </div>

            <form onSubmit={handleSubmit(submitForm)}>
                <label htmlFor="email">email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="adresse email"
                    className="Text-form"
                    {...register("email")}
                    autoComplete="off"
                />
                {errors.email &&
                    <div className="red">{errors.email.message}</div>
                }
                <label htmlFor="password">mot de passe</label>
                <input
                    type="password"
                    name="password"
                    id="email"
                    placeholder="mot de passe"
                    className="Text-form"
                    {...register("password")}
                    autoComplete="off"
                />
                {errors.password &&
                    <div className="text-red">{errors.password.message}</div>
                }

                {isSubmitting ?
                    <div>
                        loading
                    </div>
                    :
                    <button className="" type="submit">Connexion</button>
                }
            </form>




        </div>
    )
}

export default Login