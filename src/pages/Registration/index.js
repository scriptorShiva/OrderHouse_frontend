import React from "react";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import RegisterWrapper from "./register";
import Input from "../../components/input";
import Button from "../../components/Button";
import { ColorsUsed } from "../../constants/colorsUsed";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateForm } from "../../helper/authHelper";
import Auth from "../../assets/images/Auth.png";

function Registration() {
  const navigate = useNavigate();
  //states
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formValid, setFormValid] = useState(false);

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

    const signUpResult = await AuthService.signUp(
      values.name,
      values.username,
      values.password,
      values.email
    );

    if (signUpResult.success) {
      toast.success("Successfully registered !");
      navigate("/login");
    } else {
      toast.error(signUpResult.errorMessage);
    }
  };

  return (
    <>
      <RegisterWrapper>
        <div className="img-wrapper">
          <img src={Auth} alt="auth-img" />
        </div>
        <div className="register">
          <div className="register__icon">
            <CgProfile size={50} />
          </div>
          <div className="register__title">Registration</div>
          <form onSubmit={submitForm}>
            <div className="register__input-wrapper">
              <Input
                icon={<FaUserAlt size={25} />}
                name="name"
                type="text"
                placeholder="Enter your name"
                inputValue={values.name}
                handleChange={(e) => handleChange(e)}
                errorMsg={errors.name}
              />
              <Input
                icon={<FaUserAlt size={25} />}
                name="username"
                type="text"
                placeholder="Enter your username"
                inputValue={values.username}
                handleChange={(e) => handleChange(e)}
                errorMsg={errors.username}
              />
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

              <Input
                icon={<RiLockPasswordFill size={25} />}
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                inputValue={values.confirmPassword}
                handleChange={(e) => handleChange(e)}
                errorMsg={errors.confirmPassword}
              />
            </div>

            <div
              className="register__forgotPassword"
              onClick={() => {
                navigate("/login");
              }}>
              Already registered?
            </div>
            <div className="register__button">
              <Button
                filled={true}
                bgcolor={ColorsUsed.navButtonBackground}
                btnTitle="Register"
                disabled={!formValid}
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
      </RegisterWrapper>
    </>
  );
}

export default Registration;
