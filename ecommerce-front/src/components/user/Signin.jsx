import { useState } from "react";
import { Navigate } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    // higher order function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true,
                        });
                    });
                }
            })
            .catch(exc => {
                console.error("+++ exc signin: ", exc);
                // we log error
                setValues({ ...values, error: exc.message, loading: false });
            });
    };

    const signUpForm = () => (
        <form className="auth-form">
            <h1>Sign In</h1>
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
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Navigate to="/" />;
        }
    };

    return (
        <>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </>
    )
}

export default Signin