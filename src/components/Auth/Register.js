import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService";
import {Spinner} from "../Spinner/Spinner";

export const Register = () => {
    const navigate = useNavigate();
    const [createData, setCreateData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    async function handleSubmitForm(e) {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await AuthService.register(createData);
            if (res.data.success) {
                navigate('/login', {replace: true});
            } else {
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    let updateCreateData = (e) => {
        setCreateData({...createData, [e.target.name]: e.target.value})
    }
    return (
        <React.Fragment>
            {
                loading ? <Spinner/> : (
                    <div className="container w-25 mt-5">
                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                                <Link to="/login"
                                      className="nav-link"
                                      id="tab-login"
                                      data-mdb-toggle="pill"
                                      role="tab"
                                      aria-controls="pills-login" aria-selected="true">Login</Link>
                            </li>
                            <li className="nav-item" role="presentation">
                                <Link to="/register"
                                      className="nav-link active"
                                      id="tab-register"
                                      data-mdb-toggle="pill"
                                      role="tab"
                                      aria-controls="pills-register" aria-selected="false">Register</Link>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="pills-login" role="tabpanel"
                                 aria-labelledby="tab-login">
                                <form onSubmit={handleSubmitForm}>
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
                                        <label className="form-label" htmlFor="fullName">Full Name</label>
                                        <input type="text"
                                               id="fullName"
                                               className="form-control"
                                               name="fullName"
                                               value={createData.fullName}
                                               onChange={updateCreateData}
                                        />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="loginName">Email</label>
                                        <input type="email"
                                               id="loginName"
                                               className="form-control"
                                               name="email"
                                               value={createData.email}
                                               onChange={updateCreateData}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="loginPassword">Password</label>
                                        <input type="password"
                                               id="loginPassword"
                                               className="form-control"
                                               name="password"
                                               value={createData.password}
                                               onChange={updateCreateData}
                                        />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                        <input type="password"
                                               id="confirmPassword"
                                               className="form-control"
                                               name="confirmPassword"
                                               value={createData.confirmPassword}
                                               onChange={updateCreateData}
                                        />
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-4">
                                            <input type="submit" className="btn btn-primary btn-block mb-4"
                                                   value="Register"/>
                                        </div>
                                        <div className="col-md-8 text-end">
                                            <p>Already have an account? <Link to="/login"> Login</Link></p>
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
