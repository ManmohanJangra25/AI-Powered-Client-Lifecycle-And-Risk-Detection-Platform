export const validateSignup = (form) => {
  const errors = {};

  if (!form.name) errors.name = "Name is required";

  if (!form.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Invalid email";
  }

  if (!form.password) {
    errors.password = "Password is required";
  } else if (form.password.length < 6) {
    errors.password = "Minimum 6 characters required";
  }

  if (!form.company) errors.company = "Company name is required";

  return errors;
};
