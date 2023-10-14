export const validateForm = (name, value, values) => {
  let errors = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  switch (name) {
    case "name":
      if (value.trim() === "") {
        errors.name = "Name is required";
      } else if (!/^[a-zA-Z\s]{3,16}$/.test(value)) {
        errors.name =
          "Name should be 3-16 characters and should not include special characters";
      }
      break;
    case "username":
      if (value.trim() === "") {
        errors.username = "Username is required";
      } else if (!/^[a-zA-Z0-9]{3,16}$/.test(value)) {
        errors.username =
          "Username should be 3-16 characters and should not include special characters but includes numbers";
      }
      break;
    case "email":
      if (value.trim() === "") {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errors.email = "Invalid email format";
      }
      break;
    case "password":
      if (value.trim() === "") {
        errors.password = "Password is required";
      } else if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,16}$/.test(
          value
        )
      ) {
        errors.password =
          "Password should be 3-16 characters and it should include at least one number, one character, one special character";
      }
      break;
    case "confirmPassword":
      if (value.trim() === "") {
        errors.confirmPassword = "Confirm password is required";
      } else if (value !== values.password) {
        errors.confirmPassword = "Passwords don't match";
      }
      break;
    default:
      break;
  }

  return errors;
};
