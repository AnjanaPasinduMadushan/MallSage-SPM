import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addBaggageEmployee } from "../../Api/services/BaggageEmployee";

function AddBaggageEmployeeForm() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

  const location = useLocation();
  const { userId } = location.state || {};

  const [inputs, setInputs] = useState({
    initial: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Address: "",
  });

  const [errors, setErrors] = useState({});

  console.log("inputs", inputs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validationSchema = yup.object().shape({
    initial: yup.string().required("Initial is required"),
    FirstName: yup.string().required("FirstName is required"),
    LastName: yup.string().required("LastName is required"),
    Email: yup.string().email("Invalid email").required("Email is required"),
    Address: yup.string().required("Address is required"),
  });
//   console.log("userId", userId);
//   console.log("errors", errors);
  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate({ ...inputs }, { abortEarly: false })
      .then(async () => {
        try {
          await addBaggageEmployee(
            inputs.initial +
              " " +
              " " +
              inputs.FirstName +
              " " +
              " " +
              inputs.LastName,
            inputs.Email,
            inputs.Address,
            userId
          );
          toast.success("Baggage Employee Added Successfully");
          navigate("/adminhome");
          console.log("Form data is valid:", { ...inputs });
        } catch (error) {
          toast.error("Baggage Employee Adding Failed");
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

  return (
    <>
      <ToastContainer />
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
          textAlign={"center"}
        >
          👲Add Baggage Employeee👲
        </Typography>
        <InputLabel sx={labelStyles}>Initial</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="initial"
          value={inputs.initial}
          label="Initial"
          onChange={handleChange}
          error={!!errors.initial}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"Mr."}>Mr.</MenuItem>
          <MenuItem value={"Mrs."}>Mrs.</MenuItem>
          <MenuItem value={"Ms."}>Ms.</MenuItem>
        </Select>
        <InputLabel sx={labelStyles}>First Name</InputLabel>
        <TextField
          id="outlined-basic"
          label="FirstName"
          variant="outlined"
          name="FirstName"
          value={inputs.FirstName}
          onChange={handleChange}
          error={!!errors.FirstName}
          helperText={errors.FirstName}
        />
        <InputLabel sx={labelStyles}>Last Name</InputLabel>
        <TextField
          id="outlined-basic"
          label="LastName"
          variant="outlined"
          name="LastName"
          value={inputs.LastName}
          onChange={handleChange}
          error={!!errors.LastName}
          helperText={errors.LastName}
        />
        <InputLabel sx={labelStyles}>Email</InputLabel>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="Email"
          value={inputs.Email}
          onChange={handleChange}
          error={!!errors.Email}
          helperText={errors.Email}
        />
        <InputLabel sx={labelStyles}>Address</InputLabel>
        <TextField
          id="filled-multiline-static"
          label="Address."
          multiline
          rows={4}
          variant="outlined"
          name="Address"
          value={inputs.Address}
          onChange={handleChange}
          error={!!errors.Address}
          helperText={errors.Address}
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

export default AddBaggageEmployeeForm;
