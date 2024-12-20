import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router";
import { FaEyeSlash, FaEye } from "react-icons/fa";
 

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;

        // reset error
        setSuccess('');
        setRegisterError('');
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one uppercase character [A-Z]');
            return;
        } else if (!/[a-z]/.test(password)) {
            setRegisterError('Your password should be at least one lowercase character [a-z]')
        } else if (!accepted) {
            setRegisterError('Please accepted our terms and condition')
            return;
        }


        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess('User created successfully');
                // update profile
                updateProfile(user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg",
                })
                    .then(() => {
                        console.log('Profile updated');

                    })
                    .catch(error => {
                        console.log(error);

                    })

                // send verification user
                sendEmailVerification(user)
                    .then(() => {
                        alert('Please cheek your email and verify your account')
                    })

            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            });

    };



    return (
        <div className="mx-auto   rounded-lg">
            <div className="mx-auto  md:w-1/2">
                <h3 className="text-3xl my-10 text-center py-4 "> Please register</h3>
                <form onSubmit={handleRegister}>
                    <input placeholder="Please type your name" required className="mb-4  text-white bg-gray-500 w-full rounded-sm px-4 py-2" type="text" name="name" /> <br />
                    <input placeholder="Please type your email address" required className="mb-4  text-white bg-gray-500 w-full rounded-sm px-4 py-2" type="email" name="email" /> <br />


                    <div className="relative">
                        <input
                            placeholder=" Please type your password"
                            required
                            className="  text-white bg-gray-500  w-full rounded-sm px-4 py-2"
                            type= "password"
                            name="password" />
                     <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                            }
                        </span> 
                    </div> 
                    <br />
                    <div className="mb-2 ">
                        <input className="mr-2" type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms"> Accept Our terms and condition</label>
                    </div>

                    <br />

                    <input className=" text-2xl w-full btn btn-secondary" type="submit" name="submit" value="Register" /><br />

                </form>
                <p className="text-green-400 font-medium mt-4">Already have an account?  please Login <Link to="/login"> <button className="btn btn-primary ml-4">Login</button></Link></p>
                {
                    success && <p className="text-green-600">{success}</p>
                }
                {
                    registerError && <p className="text-red-600 ">{registerError}</p>

                }
            </div>
        </div>
    );
};

export default Register;