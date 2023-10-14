import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { getAllBlogs } from "../../Api/services/blogService";
import ReactImageGallery from "react-image-gallery";
import { useNavigate } from "react-router-dom";


const BlogGrid = () => {
  const navigate = useNavigate();
  // const [blogs, setBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    const res = await getAllBlogs();
    setBlogs(res.data)
    console.log(blogs);
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);


  return (
    <div className="m-5">
      <div className="container-fluid">
        <div className="row">

          {blogs.map((item, index) => (
            <Col key={index} xs={6} md={4} lg={3} className="mb-4">
              <Card
                className="mx-auto text-center"
                onClick={() => navigate(`/viewBlog/${item._id}`)}
              >
                <div className="d-flex align-items-center" style={{ height: "180px", overflow: "hidden" }}>
                  <ReactImageGallery
                    items={
                      item.images.map((image) => ({
                        original: image.url,
                      }))
                    }
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showBullets={item.images.length > 1}
                    autoPlay={true}
                    slideInterval={8000} // show image
                    slideDuration={800} // transition speed
                  />
                </div>
                <Card.Body>
                  <Card.Title>
                    <h5>{item.title}</h5>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogGrid;