'use client'

import React from 'react'

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '@/features/auth/authActions';
import { AppDispatch } from '@/redux/store';
const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 charachtere")
})



export type LoginSchema = z.infer<typeof formSchema>;
const Login = () => {
    
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginSchema>({
        resolver: zodResolver(formSchema)
    })
    
    
    const submitForm = (data: LoginSchema) => {
        const dispatch: AppDispatch = useDispatch();
        dispatch(userLogin(data))
        reset()
    }
    return (
        <div> 
            <div className="v2ao tlK SMy Vft">
                <h3>Se connecter</h3>
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
                    required
                    autoComplete="off"
                />
                <label htmlFor="password">mot de passe</label>
                <input
                    type="password"
                    name="password"
                    id="email"
                    placeholder="mot de passe"
                    className="Text-form"
                    {...register("password")}
                    required
                    autoComplete="off"
                />
                  {isSubmitting ? 
                <div>
                  loading
                </div>
                :
                <button className="" type="submit">Connexion</button>
              }
            </form>
            {errors.email &&
                <div className="text-red-500">{errors.email.message}</div>
            }

            {errors.password &&
                <div className="text-red-500">{errors.password.message}</div>
            }


        </div>
    )
}

export default Login