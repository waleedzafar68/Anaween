import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import { addUser } from "../../redux/users/action";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState();

    const registerOperator = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('Name', FullName);
        formData.append('Email', Email);
        formData.append('Password', Password);
        formData.append('Image', image);
        formData.append('Role', "User");

        dispatch(
            addUser(formData, {})
        );
    };

    useEffect(() => {
        if (!image) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(image);
    }, [image]);

    useEffect(() => {
        const handlePopState = () => {
            // Browser Back button pressed!
            // navigate('/');
            navigate('/');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    return (
        <React.Fragment>
            <main
                id="loginSection"
                className="relative flex flex-col justify-center items-center h-screen bg-[#212121] py-6"
            >
                <span className="absolute top-2 sm:top-6 right-4 sm:right-8 md:right-10 text-3xl text-[color:var(--primary-color)] font-semibold cursor-pointer" onClick={() => navigate('/')}>x</span>
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
                <div className="login_container relative flex flex-col items-center w-full overflow-y-scroll">
                    <div className="flex flex-col justify gap-6 md:gap-8 lg:gap-10 xl:gap-12 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 2xl:w-[36%]">
                        <div className="flex flex-col gap-1 text-gray-50 font-sans-serif font-semibold">
                            <p className="login_heading text-[1.3rem]">Anaween : User</p>
                            <p className="login_subHeading font-semibold">
                                CRM Sign up
                            </p>
                        </div>
                        <div className="login_card relative bg-white flex border-2 border-t-[6px] border-[color:var(--primary-color)] flex-col gap-4 px-4 sm:px-8 md:px-10 rounded-tr-none rounded-sm form-signin-logo pt-12 pb-6 box-shadow">
                            <form
                                onSubmit={registerOperator}
                                autoComplete="off"
                                className="flex flex-col"
                            >
                                <div className="relative z-0 mb-1 w-full peer">
                                    <input
                                        type="text"
                                        value={FullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        name="floating_name"
                                        id="floating_name"
                                        className="block pb-2 pt-5 px-2 w-full text-[#212020] bg-transparent border-transparent border border-b border-b-gray-600 appearance-none focus:outline-none focus:border-b-2 focus:border-[color:var(--primary-color)] focus:ring-0 peer font-semibold"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="floating_name"
                                        className={`${FullName?.length > 0 && "-translate-y-3"
                                            } peer-focus:font-medium px-2 absolute text-sm text-gray-500 duration-300 ease-in-out transform scale-75 top-3 origin-[0] left-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.86] peer-focus:bg-[white] peer-focus:-translate-y-5 z-20 cursor-text`}
                                    >
                                        Full Name
                                    </label>
                                    <i
                                        className={`inputIcon far fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-[color:var(--primary-color)]`}
                                    ></i>
                                </div>
                                <div className="relative z-0 my-4 w-full peer">
                                    <input
                                        type="email"
                                        name="email"
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        className="block pb-2 pt-5 px-2 w-full text-[#212020] border-transparent bg-transparent border border-b border-b-gray-600 appearance-none outline-none focus:ring-0 focus:border-[color:var(--primary-color)] focus:border-b-2 peer font-semibold"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className={`${Email.length > 0 && "-translate-y-3"
                                            } peer-focus:font-medium px-2 absolute text-sm text-gray-500 duration-300 ease-in-out transform scale-75 top-3 origin-[0] left-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.86] peer-focus:bg-[white] peer-focus:-translate-y-5 z-20 cursor-text`}
                                    >
                                        Email
                                    </label>
                                    <i className="inputIcon fa-regular fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-[color:var(--primary-color)]"></i>
                                </div>
                                <div className="relative z-0 mb-4 w-full peer">
                                    <input
                                        type="number"
                                        name="phone"
                                        value={Phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        id="phone"
                                        className="block pb-2 pt-5 px-2 w-full text-[#212020] border-transparent bg-transparent border border-b border-b-gray-600 appearance-none outline-none focus:ring-0 focus:border-[color:var(--primary-color)] focus:border-b-2 peer font-semibold"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="phone"
                                        className={`${Email.length > 0 && "-translate-y-3"
                                            } peer-focus:font-medium px-2 absolute text-sm text-gray-500 duration-300 ease-in-out transform scale-75 top-3 origin-[0] left-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.86] peer-focus:bg-[white] peer-focus:-translate-y-5 z-20 cursor-text`}
                                    >
                                        Phone
                                    </label>
                                    <div className="inputIcon absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-[color:var(--primary-color)]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative z-0 mb-4 w-full peer">
                                    <input
                                        type="password"
                                        name="password"
                                        value={Password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="password"
                                        className="block pb-2 pt-5 px-2 w-full text-[#212020] border-transparent bg-transparent border border-b border-b-gray-600 appearance-none outline-none focus:ring-0 focus:border-[color:var(--primary-color)] focus:border-b-2 peer font-semibold"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="password"
                                        className={`${Password.length > 0 && "-translate-y-3"
                                            } peer-focus:font-medium px-2 absolute text-sm text-gray-500 duration-300 ease-in-out transform scale-75 top-3 origin-[0] left-1 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.86] peer-focus:bg-white peer-focus:-translate-y-5 z-20 cursor-text`}
                                    >
                                        Password
                                    </label>
                                    <i className="inputIcon fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-[color:var(--primary-color)]"></i>
                                </div>
                                {/* <div className="flex flex-col gap-2">
                                    <label className=" text-black">Profile Image</label>
                                    <input
                                        id={"ImageSelected"}
                                        name="ImageSelected"
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={(e) => {
                                            setimage(e.target.files[0])
                                        }}
                                        className="form-control border border-gray-300 bg-gray-50 rounded-l-sm cursor-pointer text-sm leading-5"
                                    />
                                    <div className="inline-flex">
                                        {image &&
                                            <img
                                                alt="selected image"
                                                className="w-20 h-20 m-1"
                                                src={previewUrl}
                                                width={60}
                                                height={60}
                                            ></img>
                                        }

                                    </div>
                                </div> */}

                                <div className="flex flex-col items-center justify-center text-black">
                                    <div className="my-2">
                                        <label htmlFor="profile-pic-upload" className="cursor-pointer font-medium text-gray-500">
                                            Profile Picture
                                        </label>
                                    </div>
                                    <div className="flex items-center w-24 md:w-28 h-24 md:h-28 mb-2 rounded-full relative cursor-pointer hover:opacity-90">
                                        {previewUrl && <img
                                            className="object-cover w-full h-full rounded-full cursor-pointer"
                                            // src={previewUrl ? previewUrl : "/default-profile-pic.png"}
                                            src={previewUrl}
                                            alt="Profile"
                                        />}
                                        <label htmlFor="profile-pic-upload">
                                            <div className={`absolute inset-0 rounded-full ${!previewUrl && 'opacity-50 hover:opacity-75 bg-gray-700'} flex items-center justify-center`}>
                                                {!previewUrl && <i className="fas fa-upload text-xl text-white" aria-hidden="true"></i>}
                                            </div>
                                        </label>
                                        <input
                                            id="profile-pic-upload"
                                            name="ImageSelected"
                                            type="file"
                                            className="sr-only !cursor-pointer"
                                            accept=".png, .jpg, .jpeg"
                                            onChange={(e) => {
                                                setImage(e.target.files[0])
                                            }}
                                        />
                                    </div>

                                </div>
                                <div className="flex w-full justify-end mt-2">
                                    <button
                                        type="submit"
                                        id="registerBtn"
                                        className="btn btn-success sm:text-[1.01rem] bg-[color:var(--primary-color)] text-white py-[0.38rem] px-2 rounded-md hover:text-[color:var(--secondary-color)] outline-none font-open-sans"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                            {/* Top Left Register Text */}
                            <div className="flex items-center gap-1 justify-center absolute -top-10 -right-[0.12rem] w-fit px-[0.7rem] h-9 bg-[color:var(--primary-color)] text-white rounded-t-sm font-open-sans">
                                <i className="far fa-user text-sm"></i>
                                <span className="text-sm">Register</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            id="loginBtn"
                            className="btn btn-success mx-auto w-fit px-4 sm:text-[1.03rem] bg-[color:var(--primary-color)] text-white py-[0.38rem] rounded-md hover:text-[color:var(--secondary-color)] outline-none font-open-sans"
                            onClick={() => navigate('/login')}
                        >
                            Already a user? Login
                        </button>
                    </div>
                </div>
            </main >
        </React.Fragment >
    );
}

export default Register;
