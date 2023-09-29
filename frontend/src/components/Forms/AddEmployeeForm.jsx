import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MuiTelInput } from "mui-tel-input";
import { signup } from "../../Api/services/authService";

function AddEmployeeForm() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

  const [inputs, setInputs] = useState({
    firstname: "",
    mobile: "",
    email: "",
    role: "",
    password: "",
  });
  const [phone, setPhone] = React.useState("");
  const [errors, setErrors] = useState({});

  console.log("inputs", inputs);

  console.log("phone", phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleMobileChange = (newPhone) => {
    setPhone(newPhone);
  };

  const validationSchema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    phone: yup.string().required("Mobile is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    role: yup.string().required("Role is required"),
    password: yup
      .string()
      .required("Password is required")
      .test(
        "is-strong-password",
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        (value) => {
          // Password must be at least 8 characters long
          if (value.length < 8) {
            return false;
          }

          // Password must contain at least one uppercase letter
          if (!/[A-Z]/.test(value)) {
            return false;
          }

          // Password must contain at least one lowercase letter
          if (!/[a-z]/.test(value)) {
            return false;
          }

          // Password must contain at least one digit
          if (!/[0-9]/.test(value)) {
            return false;
          }

          // Password must contain at least one special character
          if (!/[!@#$%^&*()-=_+[\]{}|;:"<>,.?/~]/.test(value)) {
            return false;
          }

          return true;
        }
      ),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate({ ...inputs, phone }, { abortEarly: false })
      .then(async () => {
        try{
        const res = await signup(
          inputs.firstname,
          phone,
          inputs.email,
          inputs.password,
          inputs.role
        );
        console.log("res",res.User._id)
        toast.success('Employee Added Successfully');
        if (inputs.role === "shop") {
          navigate("/addShop", { state: { userId: res.User._id } });
        }else if(inputs.role === "baggageemployee") {
          navigate("/addBaggageemployee", { state: { userId: res.User._id } });
        }
        console.log("Form data is valid:", { ...inputs, phone });
        }catch(error){
            toast.error('Employee Adding Failed');
            console.log(error);
        }
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/adminhome");
  };
  return (
    <>
    <ToastContainer/>
    <Box
      border={3}
      borderColor="linear-gradient(90deg, rgba(255,252,13,1) 60%, rgba(110,224,200,1) 100%, rgba(169,175,14,1) 100%)"
      borderRadius={10}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      margin={"auto"}
      marginTop={3}
      display="flex"
      flexDirection={"column"}
      width={"80%"}
    >
      <Typography
        fontWeight={"bold"}
        padding={3}
        color="black"
        variant="h2"
        // textAlign={"center"}
      >
        <Button
          sx={{ marginRight: "15%", border: "1px solid black" }}
          onClick={handleButtonClick}
        >
          <ArrowBackIcon style={{ marginLeft: "5px" }} />
          Back
        </Button>
        🧑Add Employee🪪
      </Typography>
      <InputLabel sx={labelStyles}>First Name</InputLabel>
      <TextField
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        name="firstname"
        value={inputs.firstname}
        onChange={handleChange}
        error={!!errors.firstname}
        helperText={errors.firstname}
      />
      <InputLabel sx={labelStyles}>Mobile </InputLabel>
      <MuiTelInput
        value={phone}
        onChange={handleMobileChange}
        error={!!errors.phone}
        helperText={errors.phone}
      />
      <InputLabel sx={labelStyles}>Email Address </InputLabel>
      <TextField
        id="outlined-basic"
        label="email"
        variant="outlined"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <InputLabel sx={labelStyles}>Role</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="role"
        value={inputs.role}
        label="Role"
        onChange={handleChange}
        error={!!errors.role}
      >
        <MenuItem value={""}>None</MenuItem>
        <MenuItem value={"shop"}>Shop</MenuItem>
        <MenuItem value={"Security"}>Security Officer</MenuItem>
        <MenuItem value={"baggageemployee"}>Baggage Employee</MenuItem>
      </Select>
      <InputLabel sx={labelStyles}>Password</InputLabel>
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        sx={{ mt: 2, borderRadius: 4 }}
        onClick={handleSubmit}
        variant="contained"
        color="warning"
        type="submit"
      >
        {" "}
        ➕ Add Employee ➕
      </Button>
    </Box>
    </>
  );
}

export default AddEmployeeForm;
