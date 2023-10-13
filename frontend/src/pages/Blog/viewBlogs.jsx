import { useEffect, useState } from "react";
import ListBlogItem from "./local-Components/listBlogItem";
import { getAllBlogs } from "../../Api/services/blogService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewAllShopBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const loadAllBlogs = async ()=> {
    const data = await getAllBlogs();

    if(data.message == "success"){
      setBlogs(data.data);
      console.log(data.data);
    }
  }

  useEffect(() => {
    loadAllBlogs(); 
  }, []);

  return (
    <>
      <Button className="m-3" onClick={()=> navigate('/createPost')}>Create New</Button>
      {blogs.map((blog) => (
        <ListBlogItem key={blog._id} blog={blog} />
      ))}
    </>
  );
}

export default ViewAllShopBlogs;