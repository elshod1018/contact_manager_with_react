import React, {useState} from "react";
import './login.css';
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService";
import {Spinner} from "../Spinner/Spinner";

export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [tokenRequest, setTokenRequest] = useState({
        email: "",
        password: ""
    });

    const updateLoginData = (e) => {
        setTokenRequest({...tokenRequest, [e.target.name]: e.target.value});
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await AuthService.login(tokenRequest);
            if (res.data.success) {
                navigate('/', {replace: true});
                localStorage.setItem('accessToken', res.data.data.accessToken);
                localStorage.setItem('refreshToken', res.data.data.refreshToken);
            } else {
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <React.Fragment>
            {
                loading ? <Spinner/> : (
                    <div className="container w-25 mt-5">
                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                                <Link to="/login"
                                      className="nav-link active"
                                      id="tab-login"
                                      data-mdb-toggle="pill"
                                      role="tab"
                                      aria-controls="pills-login" aria-selected="true">Login</Link>
                            </li>
                            <li className="nav-item" role="presentation">
                                <Link to="/register"
                                      className="nav-link"
                                      id="tab-register"
                                      data-mdb-toggle="pill"
                                      role="tab"
                                      aria-controls="pills-register" aria-selected="false">Register</Link>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="pills-login" role="tabpanel"
                                 aria-labelledby="tab-login">
                                <form onSubmit={handleSubmitLogin}>
                                    <div className="text-center mb-3">
                                        <p>Sign in with:</p>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-facebook-f"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-google"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-twitter"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-github"></i>
                                        </button>
                                    </div>

                                    <p className="text-center">or:</p>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="loginName">Email</label>
                                        <input type="email"
                                               id="loginName"
                                               className="form-control"
                                               name="email"
                                               value={tokenRequest.email}
                                               onChange={updateLoginData}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="loginPassword">Password</label>
                                        <input type="password"
                                               id="loginPassword"
                                               className="form-control"
                                               name="password"
                                               value={tokenRequest.password}
                                               onChange={updateLoginData}
                                        />
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in
                                            </button>
                                        </div>
                                        <div className="col-md-6 text-end">
                                            <Link to="/login">Forgot password?</Link>
                                        </div>
                                        <div className="text-start">
                                            <p>Not a member? <Link to="/register">Register</Link></p>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}
