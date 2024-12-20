import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config"
import { useState, useRef } from "react";
import { Link } from "react-router";


const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null)


    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset error and success
        setLoginError('');
        setSuccess('')
        // add validation



        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (result.user.emailVerified) {
                    setSuccess('login successfully');
                } else {
                    alert('please verify your email address')
                }
            })
            .catch(error => {

                setLoginError(error.message);
            });
    };
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {

            console.log('Please provide an email', emailRef.current.value);
            return;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('please right a valid email');
            return;
        }

        // sent validation email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please cheek your email');

            })
            .catch(error => {
                console.log(error);

                setLoginError(error.message)

            })
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input ref={emailRef}
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>

                            </div>
                            <p className="text-green-400 font-medium">New to this website? please Register <Link to="/register"> <button className="btn btn-primary ml-4">Register</button></Link></p>
                        </form>
                        {
                            success && <p className="text-green-600">{success}</p>
                        }
                        {
                            loginError && <p className="text-red-600 ">{loginError}</p>

                        }
                    </div>



                </div>

            </div>

        </div>
    );
};

export default Login;