import { useContext } from "react"
import { AuthContext } from "../context/AuthContext/AuthContext"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

  const { state, login } = useContext(AuthContext)

  //handle the state
  const [formdata, setFormdata] = useState({
    email: "", password: ""
  });

  const { email, password } = formdata;

  //handle data change
  const onChangeInput = (e) => {
    console.log(e.target.name)
    return setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  //handle the submit  form
  // const  handleSubmit = (e) => {
  //   e.preventDefault();
  //   //login action
  //   login(formdata);

  // }
  const handleSubmit =  (e) => {
    e.preventDefault();

    // Await the login function
    login(formdata);
    // Redirect or perform other actions upon successful login

    // Handle login errors here
    console.log(state?.error)
  }
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                  <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                  </h2>
                  {state?.error && (
                    <p className="text-red-500 text-center">{state?.error}</p>
                  )}
                </div>
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                  <input onChange={onChangeInput}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input onChange={onChangeInput}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign In</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create an account</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
