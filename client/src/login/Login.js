import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { login } from "../redux/auth/action";

function Login({ Role }) {
    const dispatch = useDispatch();
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");

    const loginOperator = (e) => {
        e.preventDefault();
        dispatch(
            login({
                Role,
                Name,
                Password,
            })
        );
    };

    return (
        <React.Fragment>
            <main
                id="loginSection"
                className="flex flex-col justify-center items-center h-[80vh] sm:h-screen bg-[#212121] overflow-hidden"
            >
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        className: "",
                        duration: 5000,
                        style: {
                            background: "#fff",
                            color: "#363636",
                        },
                        success: {
                            duration: 3000,
                            theme: {
                                primary: "green",
                                secondary: "black",
                            },
                        },
                    }}
                />
                <div className="login_container flex flex-col items-center w-full">
                    <div className="flex flex-col justify gap-12 w-11/12 sm:w-3/4 md:w-1/2 2xl:w-[30%]">
                        <div className="flex flex-col gap-1 text-gray-50 font-sans-serif font-semibold">
                            <p className="login_heading text-[1.3rem]">Anaween : {Role}</p>
                            <p className="login_subHeading font-semibold">
                                CRM Login
                            </p>
                        </div>
                        <div className="login_card relative bg-white flex border-2 border-t-[6px] border-[color:var(--primary-color)] flex-col gap-4 px-4 sm:px-6 md:px-8 lg:px-10 rounded-tr-none rounded-sm form-signin-logo pt-12 pb-6 box-shadow">
                            <form
                                onSubmit={loginOperator}
                                autoComplete="off"
                                className="flex flex-col"
                            >
                                <div className="relative z-0 mb-1 w-full group">
                                    <input
                                        type="text"
                                        value={Name}
                                        onChange={(e) => setName(e.target.value)}
                                        name="floating_email"
                                        id="floating_email"
                                        className="block pb-2 pt-5 px-2 text-sm w-full text-[#212020] bg-transparent border-transparent border border-b border-b-gray-600 appearance-none focus:outline-none focus:border-b-2 focus:border-[color:var(--primary-color)] focus:ring-0 peer font-semibold"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_email"
                                        className={`${Name?.length > 0 && "-translate-y-2"
                                            } peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform scale-75 top-3 -z-10 origin-[0] left-2 peer-focus:text-[#212020] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2`}
                                    >
                                        Username
                                    </label>
                                    <i
                                        className={`inputIcon fas fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-[color:var(--primary-color)]`}
                                    ></i>
                                </div>
                                <div className="relative z-0 mb-4 w-full group">
                                    <input
                                        type="password"
                                        name="floating_password"
                                        value={Password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="floating_password"
                                        className="block pb-2 pt-5 px-2 text-sm w-full text-[#212020] border-transparent bg-transparent border border-b border-b-gray-600 appearance-none outline-none focus:ring-0 focus:border-[color:var(--primary-color)] focus:border-b-2 peer font-semibold"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_password"
                                        className={`${Password.length > 0 && "-translate-y-2"
                                            } peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform scale-75 top-3 -z-10 origin-[0] left-2 peer-focus:text-[#212020] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2`}
                                    >
                                        Password
                                    </label>
                                    <i className="inputIcon fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-[color:var(--primary-color)]"></i>
                                </div>
                                <div className="flex w-full justify-end">
                                    <button
                                        type="submit"
                                        id="loginBtn"
                                        className="btn btn-success text-sm sm:text-base bg-[color:var(--primary-color)] text-white py-[0.38rem] px-2 rounded-[0.3rem] hover:text-[color:var(--secondary-color)] outline-none font-open-sans"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            {/* Top left sign in Banner */}
                            <div className="flex items-center gap-1 justify-center absolute -top-10 -right-[0.1rem] w-fit px-[0.7rem] h-9 bg-[color:var(--primary-color)] text-white rounded-t-sm font-open-sans">
                                <i className="far fa-user text-sm"></i>
                                <span className="text-sm">Sign in</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default Login;
