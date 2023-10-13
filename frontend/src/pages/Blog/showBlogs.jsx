import { useEffect, useState } from "react";
import ListBlogItem from "./local-Components/listBlogItem";
import { deleteBlog, getAllBlogs } from "../../Api/services/blogService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ShowShopBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const loadAllBlogs = async () => {
    const data = await getAllBlogs();

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
        onClick={() => navigate('/createBlog')}
      > Create New </Button>

      {blogs.map((blog) => (
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
            }else{
              toast.update(toastId, {
                render: `Error: ${res.msg}`,
                type: "error",
                isLoading: false,
                autoClose: 5000,
              });
            }
          }}
        />
      ))}
    </>
  );
}

export default ShowShopBlogs;