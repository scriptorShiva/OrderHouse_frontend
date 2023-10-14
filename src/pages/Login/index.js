import React from "react";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import LoginWrapper from "./login";
import Input from "../../components/input";
import Button from "../../components/Button";
import { ColorsUsed } from "../../constants/colorsUsed";
import AuthService from "../../services/auth.service";
import UtilService from "../../services/util.service";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateForm } from "../../helper/authHelper";
import Auth from "../../assets/images/Auth.png";

function Login() {
  //you can create array and then using map you can render inputs
  const navigate = useNavigate();
  //states
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = {
      ...values,
      [name]: value,
    };
    const updatedErrors = {
      ...errors,
      ...validateForm(name, value, updatedValues),
    };

    setValues(updatedValues);
    setErrors(updatedErrors);
    // Check if all input fields are filled
    const isFormFilled = Object.values(updatedValues).every(
      (val) => val !== ""
    );
    // Check if there are any validation errors
    const isValid =
      isFormFilled &&
      Object.values(updatedErrors).every((error) => error === "");
    setFormValid(isValid);
  };

  //functions
  const submitForm = async (e) => {
    e.preventDefault();

    const signUpResult = await AuthService.login(values.email, values.password);

    if (signUpResult.success && signUpResult.accessToken) {
      //production: do not save it directly we have to encrypt-decrypt it first
      const token = {
        access_token: signUpResult.accessToken,
      };
      UtilService.setLocalStorage(token, () => {
        //redirect
        navigate("/home");
      });
      toast.success("Successfully loggedIn !");
      navigate("/login");
    } else {
      toast.error(signUpResult.errorMessage);
    }
  };

  //if user already logged in throw to home page this will return component from here
  if (UtilService.isLoggedIn()) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <LoginWrapper>
        <div className="img-wrapper">
          <img src={Auth} alt="auth-img" />
        </div>
        <div className="register">
          <div className="register__icon">
            <CgProfile size={50} />
          </div>
          <div className="register__title">Login</div>

          <form onSubmit={submitForm}>
            <div className="register__input-wrapper">
              <Input
                icon={<FaUserAlt size={25} />}
                name="email"
                type="email"
                placeholder="Enter your email"
                inputValue={values.email}
                handleChange={(e) => handleChange(e)}
                errorMsg={errors.email}
              />
              <Input
                icon={<RiLockPasswordFill size={25} />}
                name="password"
                type="password"
                placeholder="Enter your password"
                inputValue={values.password}
                handleChange={(e) => handleChange(e)}
                errorMsg={errors.password}
              />
            </div>

            <div
              className="register__forgotPassword"
              onClick={() => {
                navigate("/registration");
              }}>
              Not registered?
            </div>
            <div className="register__forgotPassword">Forgot Password?</div>
            <div className="register__button">
              <Button
                filled={true}
                bgcolor={ColorsUsed.navButtonBackground}
                btnTitle="Login"
                disabled={!isValid}
                btnStyle={{
                  color: ColorsUsed.navTextColor,
                  fontSize: "22px",
                  padding: " 5px 20px",
                  width: "100%",
                }}
              />
            </div>
          </form>
        </div>
      </LoginWrapper>
    </>
  );
}

export default Login;
