import { useEffect, useState } from "react";
import ListBlogItem from "./local-Components/listBlogItem";
import { deleteBlog, getShopBlogs } from "../../Api/services/blogService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ShowShopBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const loadAllBlogs = async () => {
    const data = await getShopBlogs();

    if (data.message == "success") {
      setBlogs(data.data);
      console.log(data.data);
    }
  }

  useEffect(() => {
    loadAllBlogs();
  }, []);

  return (
    <>
      <ToastContainer />
      <Button
        style={{ marginTop: '100px', marginLeft: '80px' }}
        onClick={() => navigate('/blog')}
      > Create New </Button>

      {
        blogs.length > 0 ? blogs.map((blog) => (
          <ListBlogItem
            key={blog._id}
            blog={blog}
            onDeleteClick={async () => {
              const toastId = toast.loading("Deleting Blog...");

              const res = await deleteBlog(blog._id);

              if (res.status == 200) {
                toast.update(toastId, {
                  render: "Blog Successfuly deleted",
                  type: "success",
                  isLoading: false,
                  autoClose: 5000,
                });
                setBlogs(blogs.filter((i) => i._id !== blog._id));
              } else {
                toast.update(toastId, {
                  render: `Error: ${res.msg}`,
                  type: "error",
                  isLoading: false,
                  autoClose: 5000,
                });
              }
            }}
          />
        )) :
          <center>
            <h1 className="m-5">{"Let's Create your First Blog"}</h1>
          </center>
      }
    </>
  );
}

export default ShowShopBlogs;