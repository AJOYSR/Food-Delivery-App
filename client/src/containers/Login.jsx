import { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { LoginBg, logo } from "../assets";
import { LoginInput } from "../components";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useDispatch, useSelector } from 'react-redux';

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";

import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../context/actions/userActions";
import { alertInfo, alertWarning } from './../context/actions/alertActions';

/* Iport ends */

const Login = () => {
    const [userEmail, setuserEmail] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const alert = useSelector((state) => state.alert)

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user])

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            firebaseAuth.onAuthStateChanged((cred) => {
                if (cred) {
                    cred.getIdToken().then((token) => {
                        validateUserJWTToken(token).then((data) => {
                            dispatch(setUserDetails(data))
                        });
                        navigate('/', { replace: true })
                    });
                }
            });
        });
    };

    const signUpWithEmailPass = async () => {
        if (userEmail === "" || password === "" || confirm_password === "") {
            dispatch(alertInfo('Required fields should not be blank.'));
        } else {
            if (password.length < 6) {
                dispatch(alertInfo('password is too short. at least 6 characters.'));

            } else if (password === confirm_password) {
                try {
                    setuserEmail("");
                    setConfirm_password("");
                    setPassword("");
                    const userCred = await createUserWithEmailAndPassword(
                        firebaseAuth,
                        userEmail,
                        password
                    );

                    firebaseAuth.onAuthStateChanged((cred) => {
                        if (cred) {
                            cred.getIdToken().then((token) => {
                                validateUserJWTToken(token).then((data) => {
                                    dispatch(setUserDetails(data))
                                });
                                navigate('/', { replace: true })
                            });
                        }
                    });
                } catch (error) {
                    // Handle specific errors
                    if (error.code === "auth/email-already-in-use") {
                        // Display an alert message indicating that the email is already in use
                        dispatch(alertInfo('Email already in use'));
                    } else {
                        // Display a generic error message or handle other specific errors
                    }
                }
            } else {
                dispatch(alertWarning('The password and confirmation not matching'));
            }
        }
    };

    const signInWithEmailPass = async () => {
        if (userEmail !== "" && password !== "") {
            await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
                (userCred) => {
                    firebaseAuth.onAuthStateChanged((cred) => {
                        if (cred) {
                            cred.getIdToken().then((token) => {
                                validateUserJWTToken(token).then((data) => {
                                    dispatch(setUserDetails(data))
                                });
                                navigate('/', { replace: true })
                            });
                        }
                    });
                }
            );
        } else {
            //Alert message
        }
    };

    return (
        <div className="w-screen h-screen relative overflow-hidden flex">
            <img
                src={LoginBg}
                className="w-full h-full obeject-cover absolute top-0 left-0"
            />
            <div
                className="flex flex-col items-center lighttextGray w-[80%] 
            md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12"
            >
                <div className="flex items-center justify-start gap-4 w-full">
                    <img src={logo} className="w-8" alt="logo" />
                    <p className="text-cyan-50 font-semibold text-2xl ">Food</p>
                </div>
                <p
                    className="
                font-semibold text-3xl text-cyan-50"
                >
                    Welcome Back!
                </p>
                <p className="text-xl text-cyan-50">
                    {isSignUp ? "SignUp" : "SignIn"} with the following
                </p>
                <div
                    className="w-full flex flex-col items-center
                justify-center gap-6 px-4 md:px-12 py-4"
                >
                    <LoginInput
                        placeHolder={"Email Here"}
                        icon={<FaEnvelope className="text-xl text-textColor" />}
                        inputState={userEmail}
                        inputStateFunc={setuserEmail}
                        type={"email"}
                        isSignUp={isSignUp}
                    />

                    <LoginInput
                        placeHolder={"Password Here"}
                        icon={<FaLock className="text-xl text-textColor" />}
                        inputState={password}
                        inputStateFunc={setPassword}
                        type={"password"}
                        isSignUp={isSignUp}
                    />

                    {isSignUp && (
                        <LoginInput
                            placeHolder={"Confirm Password"}
                            icon={<FaLock className="text-xl text-textColor" />}
                            inputState={confirm_password}
                            inputStateFunc={setConfirm_password}
                            type={"password"}
                            isSignUp={isSignUp}
                        />
                    )}
                    {!isSignUp ? (
                        <p>
                            <span className="text-cyan-50">Doesn't Have an Account: </span>
                            <motion.button
                                {...buttonClick}
                                className="text-red-400 cursor-pointer bg-transparent px-1"
                                onClick={() => setIsSignUp(true)}
                            >
                                Create One
                            </motion.button>
                        </p>
                    ) : (
                        <p>
                            <span className="text-cyan-50">Already Have an Account? : </span>
                            <motion.button
                                {...buttonClick}
                                className="text-red-400 cursor-pointer bg-transparent px-1"
                                onClick={() => setIsSignUp(false)}
                            >
                                SignIn Here
                            </motion.button>
                        </p>
                    )}

                    {/* singin/signup button  */}

                    {isSignUp ? (
                        <motion.button
                            {...buttonClick}
                            className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500
                                transition-all duration-150"
                            onClick={signUpWithEmailPass}
                        >
                            Sign Up
                        </motion.button>
                    ) : (
                        <motion.button
                            {...buttonClick}
                            className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500
                                transition-all duration-150"
                            onClick={signInWithEmailPass}
                        >
                            Sign In
                        </motion.button>
                    )}
                </div>

                <div className="flex items-center justify-between gap-16">
                    <div className="w-24 h-[1px] rounded-md bg-white"></div>
                    <p className="text-white">or</p>
                    <div className="w-24 h-[1px] rounded-md bg-white"></div>
                </div>

                <motion.div
                    {...buttonClick}
                    onClick={loginWithGoogle}
                    className="flex items-center gap-4 justify-center px-20 py-2 my-4 bg-primary backdrop-blur-md cursor-pointer rounded-3xl"
                >
                    <FcGoogle className="text-3xl" />
                    <p
                        className="capitalize text-base
                    text-textColor"
                    >
                        Signin with google
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
