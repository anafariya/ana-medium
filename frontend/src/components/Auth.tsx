import { ChangeEvent, useState } from "react"
import { Link} from "react-router-dom"

export const Auth = ({type}:{type: "signup" | "signin"}) => {
    const [postInputs,setPostInputs] = useState({
        name: "",
        username: "",
        password: ""
    })
    return  <div className="h-screen flex justify-center flex-col">
        <div className="flex lg:ml-20 justify-center">
            <div>
            <div className="text-3xl font-extrabold">
                    Create an Account
                </div>
                <div className="text-slate-600">
                    Already have an account?
                    <Link className="pl-2 underline" to={"/signin"}>Login</Link>
                </div>
            <LabelledInput
            label = "Name"
            placeholder="Ana"
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }} />
             <LabelledInput
            label = "Username"
            placeholder="Ana2"
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }} />
             <LabelledInput
            label = "Password"
            type={"password"}
            placeholder="123456"
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }} />
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
    <label className="block mb-2 text-sm font-medium text-black">First name</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
</div>
}