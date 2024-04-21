import {useState} from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from 'react-toastify';


const LoginPage = ({user,setUser}) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const login = () => {
        axios.get("http://localhost:9124/login",
            {
                params: {
                    email: email,
                    password: password
                }
            })
            .then(response => {
                if (response.data.success) {
                    const cookies2 = new Cookies(null, {path: '/'})
                    cookies2.set('secret', response.data.user.secret);
                    setUser(response.data.user);
                    toast.success('Login Success');
                } else {
                    setErrorCode(response.data.errorCode)
                    toast.error("Error " + response.data.errorCode);
                }
            }).catch(()=>{
            toast.error("Error 9");
        })
    }

    return (
        <main>
            <div>
            {
                user?
                    <div>
                        <h2>successfully logged in</h2>
                    </div>
                    :
                    <div className="container">
                        <h2>Sign in</h2>
                        <table>
                            <tr>
                                <td>
                                    email:
                                </td>

                                <td>
                                    <input value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    password:
                                </td>
                                <td>
                                    <input type='password' value={password} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button className='btn' onClick={login} disabled={password.length === 0 || email.length === 0}>Login</button>
                                </td>
                            </tr>
                        </table>
                    </div>
            }
        </div>


            <ToastContainer position='top-center' />
        </main>

    )
}

export default LoginPage;