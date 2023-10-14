import { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { getOneBlog } from "../../Api/services/blogService";
import { formatDate } from "../../util/formatDate";

const ViewBlog = () => {
  const { id } = useParams();

  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [id]);

  const getData = async () => {
    const res = await getOneBlog(id);

    setTitle(res.data.title);
    setAuthor(res.data.author);
    setContent(res.data.content);
    setDate(res.data.createdDate);
    setImages(res.data.images);
  }

  return (
    <div className="m-5 pt-5 ps-5">
      <center>
        <p><b>{`Published ${formatDate(date, 'month dd, yyyy - hh:MM:ss A')}`}</b></p>
        <h1><b>{title}</b></h1>
        <h6 className="text-muted">{`Written By ${author}`}</h6>
        <hr />
        <div
          style={{
            width: "50%",
          }}
          className="d-flex align-items-center"
        >
          <ReactImageGallery
            items={
              images.map((image) => ({
                original: image.url,
              }))
            }
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={images.length > 1}
            autoPlay={true}
            slideInterval={8000} // show image
            slideDuration={800} // transition speed
          />
        </div>
      </center>
      {images.length > 0 && <hr />}
      <br />
      <div
        className="mx-5"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );

}

export default ViewBlog;