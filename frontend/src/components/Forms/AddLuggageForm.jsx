import {
  Button,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getShopIdByUserId } from "../../Api/services/shopService";
import { useSelector } from "react-redux";
import { addLuggage } from "../../Api/services/LuggageService";


function AddLuggageForm() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

  const [inputs, setInputs] = useState({
    CustomerID: "",
    CustomerEmail: "",
    BagNo: "",
  });

  const [errors, setErrors] = useState({});
  const [shop, setShop] = useState({});
  const userId = useSelector((state) => state.auth.User._id);
  console.log("inputs", inputs);
  console.log("shop", shop);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validationSchema = yup.object().shape({
    CustomerID: yup.string().required("CustomerID is required"),
    CustomerEmail: yup
      .string()
      .email("Invalid email")
      .required("Customer Email is required"),
    BagNo: yup.string().required("Number of Bags is required"),
  });

  const handleSubmit = (e) => {
    console.log("userID",userId)
    console.log("  shop?.ShopID",  shop?.ShopID)
    e.preventDefault();
    validationSchema
      .validate({ ...inputs }, { abortEarly: false })
      .then(async () => {
        try {
            const res = await getShopIdByUserId(
                userId
            );
            setShop(res);
            console.log("res", res);
    
          const result = await addLuggage(
            inputs.CustomerID,
            inputs.CustomerEmail,
            inputs.BagNo,
            shop?.shop?.ShopID
          );
          console.log("result", result);
          toast.success("Purchases Added Successfully");
          navigate("/shopHome");
          console.log("Form data is valid:", { ...inputs });
        } catch (error) {
          toast.error("Purchases Adding Failed");
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
    navigate("/shopHome");
  };
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
          // textAlign={"center"}
        >
          <Button
            sx={{ marginRight: "15%", border: "1px solid black" }}
            onClick={handleButtonClick}
          >
            <ArrowBackIcon style={{ marginLeft: "5px" }} />
            Back
          </Button>
          🛒Add Purchases🛍️
        </Typography>
        <InputLabel sx={labelStyles}>CustomerID</InputLabel>
        <TextField
          id="outlined-basic"
          label="CustomerID"
          variant="outlined"
          name="CustomerID"
          value={inputs.CustomerID}
          onChange={handleChange}
          error={!!errors.CustomerID}
          helperText={errors.CustomerID}
        />
        <InputLabel sx={labelStyles}>CustomerEmail </InputLabel>
        <TextField
          id="outlined-basic"
          label="CustomerEmail"
          variant="outlined"
          name="CustomerEmail"
          value={inputs.CustomerEmail}
          onChange={handleChange}
          error={!!errors.CustomerEmail}
          helperText={errors.CustomerEmail}
        />
        <InputLabel sx={labelStyles}>BagNo</InputLabel>
        <TextField
          id="outlined-basic"
          type="number"
          label="BagNo"
          variant="outlined"
          name="BagNo"
          value={inputs.BagNo}
          onChange={handleChange}
          error={!!errors.BagNo}
          helperText={errors.BagNo}
        />
        <Button
          sx={{ mt: 2, borderRadius: 4 }}
          onClick={handleSubmit}
          variant="contained"
          color="warning"
          type="submit"
        >
          {" "}
          ➕ Add Purchases ➕
        </Button>
      </Box>
    </>
  );
}

export default AddLuggageForm;
