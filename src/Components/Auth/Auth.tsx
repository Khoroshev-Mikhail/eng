import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function Auth(){
    const [login, setLogin] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    return(
        <div className="w-full sm:w-96 mx-auto p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <form className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="email1"
                        value="Your login or email"
                    />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder="Login"
                        required={true}
                        value={login}
                        onChange={(e)=>setLogin(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="password1"
                        value="Your password"
                    />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        placeholder="Password"
                        required={true}
                        value={pwd}
                        onChange={(e)=>setPwd(e.target.value)}
                    />
                </div>
                {/*
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">
                            Remember me
                        </Label>
                    </div>    
                */}
                <Button type="submit">
                    Submit
                </Button>
            </form>         
        </div>

    )
}