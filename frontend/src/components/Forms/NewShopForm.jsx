import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Input } from "@mui/base";
import { addShop } from "../../Api/services/shopService";

function NewShopForm() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

  const location = useLocation();
  const { userId } = location.state || {};

  const [inputs, setInputs] = useState({
    BuisnessRegNumber: "",
    Name: "",
    ShopManagerName: "",
    NumerOfEmployees: "",
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
    BuisnessRegNumber: yup.string().required("BuisnessRegNumber is required"),
    Name: yup.string().required("Mobile is required"),
    Email: yup.string().email("Invalid email").required("Email is required"),
    ShopManagerName: yup.string().required("ShopManagerName is required"),
    NumerOfEmployees: yup.string().required("NumerOfEmployees is required"),
  });
console.log("userId",userId)
console.log("errors",errors)
  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate({ ...inputs }, { abortEarly: false })
      .then(async () => {
        try {
            await addShop(
            inputs.BuisnessRegNumber,
            inputs.Name,
            inputs.Email,
            inputs.ShopManagerName,
            inputs.NumerOfEmployees,
            userId
          );
          toast.success("Shop Added Successfully");
          navigate("/adminhome");
          console.log("Form data is valid:", { ...inputs });
        } catch (error) {
          toast.error("Shop Adding Failed");
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
          🛒Add Shop🛍️
        </Typography>
        <InputLabel sx={labelStyles}>BuisnessRegNumber</InputLabel>
        <TextField
          id="outlined-basic"
          label="BuisnessRegNumber"
          variant="outlined"
          name="BuisnessRegNumber"
          value={inputs.BuisnessRegNumber}
          onChange={handleChange}
          error={!!errors.BuisnessRegNumber}
          helperText={errors.BuisnessRegNumber}
        />
        <InputLabel sx={labelStyles}>Name</InputLabel>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="Name"
          value={inputs.Name}
          onChange={handleChange}
          error={!!errors.Name}
          helperText={errors.Name}
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
        <InputLabel sx={labelStyles}>ShopManagerName</InputLabel>
        <TextField
          id="outlined-basic"
          label="ShopManagerName"
          variant="outlined"
          name="ShopManagerName"
          value={inputs.ShopManagerName}
          onChange={handleChange}
          error={!!errors.ShopManagerName}
          helperText={errors.ShopManagerName}
        />
        <InputLabel sx={labelStyles}>NumerOfEmployees</InputLabel>
        <TextField
          id="outlined-basic"
          label="NumerOfEmployees"
          variant="outlined"
          name="NumerOfEmployees"
          value={inputs.NumerOfEmployees}
          onChange={handleChange}
          error={!!errors.NumerOfEmployees}
          helperText={errors.NumerOfEmployees}
        />

        <Button
          sx={{ mt: 2, borderRadius: 4 }}
          onClick={handleSubmit}
          variant="contained"
          color="warning"
          type="submit"
        >
          {" "}
          ➕ Add Shop ➕
        </Button>
      </Box>
    </>
  );
}

export default NewShopForm;
