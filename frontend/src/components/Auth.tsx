import { ChangeEvent, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type}:{type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    const [postInputs,setPostInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post (`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data
            localStorage.setItem("token", jwt)
            navigate("/blogs")
        }
        catch (e) {
            alert("Error while signing up")
        }
    }

    return  <div className="h-screen flex justify-center flex-col">
        <div className="flex lg:ml-20 justify-center">
            <div>
            <div className="text-3xl font-extrabold">
                    Create an Account
                </div>
                <div className="text-slate-600">
                   {type === "signin" ? "Dont havwe an account?" : "Already have an account?" }
                    <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                        {type === "signup" ? "Sign in" : "Sign up"}
                    </Link>
                </div>
            {type === "signup" ? <LabelledInput
            label = "Name"
            placeholder="Ana"
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }} /> : null }
             <LabelledInput
            label = "email"
            placeholder="Ana786@gmail.com"
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    email: e.target.value
                })
            }} />
             <LabelledInput
            label = "Password"
            type={"password"}
            placeholder="123456"
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
            }} />
            <button onClick={sendRequest} type="button" className="mt-10 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                {type === "signin" ? "Sign in " : "Sign Up"}
            </button>

            </div>
            
        </div>
    </div>
    
}

interface LabelledInputType {
    label: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type? : string
}

function LabelledInput ({ label, placeholder, onChange, type}:LabelledInputType){
    return   <div>
    <label className="block mb-2 text-sm font-medium text-black">{label}</label>
    <input onChange={onChange} type={type || "text"} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}