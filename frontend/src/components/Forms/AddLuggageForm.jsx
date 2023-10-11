import { Button, Grid, InputLabel, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useQuery } from 'react-query';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getShopIdByUserId } from "../../Api/services/shopService";
import { useSelector } from "react-redux";
import { addLuggage } from "../../Api/services/LuggageService";
import { storage } from "../../Api/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AddIcon from '@mui/icons-material/Add';
import { MuiFileInput } from "mui-file-input";

function AddLuggageForm() {

  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    CustomerID: "",
    CustomerEmail: "",
    BagNo: "",
  });

  const [errors, setErrors] = useState({});
  const [shop, setShop] = useState({});
  const userId = useSelector((state) => state.auth.User._id);

  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getShopIdByUserId(userId),
  });
  console.log("data", data)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handlePdfSubmit = async (newPdf) => {
    setLoading(true);
    await setPdfFile(newPdf);
    setLoading(false);
    console.log("pdfFile", pdfFile);
  };

  const validationSchema = yup.object().shape({
    CustomerID: yup.string().required("CustomerID is required"),
    CustomerEmail: yup
      .string()
      .email("Invalid email")
      .required("Customer Email is required"),
    BagNo: yup.string().required("Number of Bags is required"),
    pdfFile: yup
      .mixed()
      .required("PDF file is required")
      .test("file-extension", "File must be a PDF", (value) => {
        if (!value) return true; // No file provided, let required validation handle it
        return value.name.endsWith(".pdf");
      }),
  });

  // const handleSubmit = (e) => {
  //   console.log("userID", userId)
  //   console.log("  shop?.ShopID", shop?.ShopID)
  //   e.preventDefault();
  //   validationSchema
  //     .validate({ ...inputs }, { abortEarly: false })
  //     .then(async () => {
  //       try {
  //         const res = await getShopIdByUserId(
  //           userId
  //         );
  //         setShop(res);
  //         console.log("res", res);

  //         const result = await addLuggage(
  //           inputs.CustomerID,
  //           inputs.CustomerEmail,
  //           inputs.BagNo,
  //           shop?.shop?.ShopID
  //         );
  //         console.log("result", result);
  //         toast.success("Purchases Added Successfully");
  //         navigate("/shopHome");
  //         console.log("Form data is valid:", { ...inputs });
  //       } catch (error) {
  //         toast.error("Purchases Adding Failed");
  //         console.log(error);
  //       }
  //     })
  //     .catch((err) => {
  //       const validationErrors = {};
  //       err.inner.forEach((error) => {
  //         validationErrors[error.path] = error.message;
  //       });
  //       setErrors(validationErrors);
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("pdf", pdfFile);
      validationSchema
        .validate({ ...inputs, pdfFile }, { abortEarly: false })
        .then(async () => {
          try {
            // Upload the PDF file to Firebase Storage
            if (pdfFile) {
              const storageRef = ref(storage, "pdfs/");
              const pdfRef = ref(storage, `pdfs/${pdfFile.name}`);
              const uploadTask = uploadBytes(pdfRef, pdfFile);
              console.log("pdf", pdfFile);
              uploadTask
                .then((snapshot) => {
                  // Handle upload progress if necessary
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log(`Upload is ${progress}% done`);
                })
                .catch((error) => {
                  // Handle upload error
                  setLoading(false);
                  console.error("Upload failed:", error);
                  toast.error("An error occurred in uploading");
                });

              // Wait for the upload to complete
              await uploadTask;

              // Get the URL of the uploaded PDF
              const downloadUrl = await getDownloadURL(pdfRef);
              setPdfUrl(downloadUrl);
              console.log("pdfurl", pdfUrl);
            }

            // Continue with your existing code to add luggage
            const res = await getShopIdByUserId(userId);
            setShop(res);

            const result = await addLuggage(
              inputs.CustomerID,
              inputs.CustomerEmail,
              inputs.BagNo,
              pdfUrl,
              data?.shop?.ShopID,
              data?.shop?.Name
            );

            toast.success("Purchases Added Successfully");
            navigate("/shopHome");
          } catch (error) {
            console.log("error", error);
            setLoading(false);
            if (error.response.data) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Purchases Adding Failed");
            }
            console.error(error);
          }
        })
        .catch((err) => {
          setLoading(false);
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
        });
    } catch (error) {
      setLoading(false);
      toast.error("An error occured");
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/shopHome");
  };
  return (
    <>
      <ToastContainer />
      <Box
        // border={3}
        // borderColor="linear-gradient(90deg, rgba(255,252,13,1) 60%, rgba(110,224,200,1) 100%, rgba(169,175,14,1) 100%)"
        borderRadius={10}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin={"auto"}
        marginTop={"6%"}
        marginLeft={"18%"}
        marginBottom={"3%"}
        display="flex"
        backgroundColor="#f2f2f2"
        flexDirection={"column"}
        width={"70%"}
        height={"80vh"}
      >
        <Typography
          fontWeight={"bold"}
          padding={3}
          color="black"
          variant="h2"
        // textAlign={"center"}
        >
          <Button
            sx={{ marginRight: "15%", border: "1px solid black", borderRadius: "8px" }}
            onClick={handleButtonClick}
          >
            <ArrowBackIcon style={{ marginLeft: "5px" }} />
            Back to Home
          </Button>
          🛒Add Purchases🛍️
        </Typography>
        <Grid container spacing={1} columns={12}sx={{ height: "400px",marginTop:"2%", marginLeft:"2%" }}>
          <Grid item xs={4}>
            <InputLabel sx={labelStyles}>CustomerID</InputLabel>
            <TextField
              id="outlined-basic"
              label="CustomerID"
              variant="outlined"
              name="CustomerID"
              sx={{ width: "100%", borderRadius: "8px" }}
              InputProps={{ style: { height: "8vh" } }}
              value={inputs.CustomerID}
              onChange={handleChange}
              error={!!errors.CustomerID}
              helperText={errors.CustomerID}
            />
          </Grid>
          <Grid item xs={8}>
            <InputLabel sx={labelStyles} style={{ marginLeft: "12%" }}>CustomerEmail </InputLabel>
            <TextField
              id="outlined-basic"
              label="CustomerEmail"
              variant="outlined"
              sx={{ width: "80%", marginLeft: "12%" }}
              InputProps={{ style: { height: "8vh" } }}
              name="CustomerEmail"
              value={inputs.CustomerEmail}
              onChange={handleChange}
              error={!!errors.CustomerEmail}
              helperText={errors.CustomerEmail}
            />
          </Grid>
          <Grid item xs={2}>
            <InputLabel sx={labelStyles}>BagNo</InputLabel>
            <TextField
              id="outlined-basic"
              type="number"
              label="BagNo"
              variant="outlined"
              sx={{ width: "100%" }}
              InputProps={{ style: { height: "8vh" } }}
              name="BagNo"
              value={inputs.BagNo}
              onChange={handleChange}
              error={!!errors.BagNo}
              helperText={errors.BagNo}
            />
          </Grid>
          <Grid item xs={10}>
            <InputLabel sx={labelStyles} style={{ marginLeft: "12%" }} >Bill Pdf</InputLabel>
            <MuiFileInput sx={{ width: "80%", marginLeft: "12%", height:"8vh" }} value={pdfFile} onChange={handlePdfSubmit} />
            {errors.pdfFile && <p style={{ color: "red" }}>{errors.pdfFile}</p>}
          </Grid>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            sx={{ mt: 2, borderRadius: 6, width: "20vw", marginLeft: "34%",marginTop:"2%", height: "8vh", fontSize: "1.4rem" }}
            onClick={handleSubmit}
            variant="contained"
            backgroundColor='#1769aa'
            type="submit"
            startIcon={<AddIcon />}
          >
            {" "}
            Add Purchases
          </Button>
        )}
      </Box>
    </>
  );
}

export default AddLuggageForm;
