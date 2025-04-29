import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const { name, email, password, success, error } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then((data) => {
                console.log("data: ", data);

                // if you need to check error from backend
                // else all exceptions are captured in catch block
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true,
                    });
                }
            })
            .catch((exc) => {
                console.error("++ exc: ", exc);
                setValues({ ...values, error: exc.message, success: false });
            });
    };
    const signUpForm = () => (
        <form className="auth-form">
            <div className="input-container">
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                    placeholder="Name"
                />
            </div>

            <div className="input-container">
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder="Email"
                />
            </div>

            <div className="input-container">
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                    placeholder="Password"
                />
            </div>
            <button onClick={clickSubmit} className="submit-btn">
                Submit
            </button>
        </form>
    )

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );


    return (
        <div>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </div>
    )
}

export default Signup