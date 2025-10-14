import React from 'react'
import './SignIn.css';
import { useForm } from "react-hook-form";
const SignIn = () => {

    type formData = {
        email: string;
        password: string;
    };
    const { handleSubmit, register, formState: {
        errors }} = useForm<formData>();

    const onSubmit = (values: formData) => console.log(values);
  return (
    <div className='signin-container'>
            <h2 className='welcome-text'>Welcome to TaskFlow</h2>
            <p className='text'>To get started, please sign in</p>
            <div className="container">
                <img src="/images/account.png" alt="profile"/>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Email</label>
                    <input type="email" 
                    {...register("email",{
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}/>
                    {typeof errors.email?.message === 'string' && <span className="error">{errors.email.message}</span>}

                    <label>Password</label>
                    <input type="password"
                    {...register("password",{
                        required: "Required",
                        pattern: {
                            value: /^[A-Za-z][A-Za-z0-9@$%]{8,}$/,
                            message: "invalid password"
                        }
                    })} />
                    {typeof errors.password?.message === 'string' && <span className="error">{errors.password.message}</span>}
                    <button>Sign in</button>
                </form>

            </div>
    </div>
  )
}

export default SignIn