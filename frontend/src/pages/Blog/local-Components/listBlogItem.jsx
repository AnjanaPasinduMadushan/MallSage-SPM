import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";
import { formatDate } from "../../../util/formatDate";


const ListBlogItem = ({ blog, onDeleteClick }) => {
  // prop validations
  ListBlogItem.propTypes = {
    blog: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      images: PropTypes.shape([{
        name: PropTypes.string,
        url: PropTypes.string,
      }]),
    }).isRequired,
    onDeleteClick: PropTypes.func,
  };

  return (
    <>
      <Card
        className="mx-auto my-4 rounded-5"
        style={{
          width: '80%',
          height: "250px",
          overflow: 'hidden'
        }}
      >
        <Card.Body className="p-0 d-flex">
          {blog.images != []}{
            <div
              className="rounded-start-5"
              style={{
                height: "100%",
                width: "40%",
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={
                  blog.images.length > 0
                    ? blog.images[0].url
                    : "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg"
                }
                alt="Card"
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 'inherit',
                }}
              />
            </div>
          }

          <div
            className="p-3"
            style={{
              height: "100%",
              width: "60%",
            }}
          >
            <div
              className="h1 mb-3">{blog.title}</div>
            <hr />
            <div className="mb-2"><span className="fw-bold">Created At:</span> {formatDate(blog.createdDate)}</div>
            <div><span className="fw-bold">Author:</span><span className="text-capitalize"> {blog.author}</span></div>
            <div className="mt-4 d-flex justify-content-around">
              <Card
                style={{
                  height: "50px",
                  width: "50px",
                }}
              >
                <Button
                  className="p-2"
                  style={{
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <FontAwesomeIcon style={{ height: "100%", width: "100%" }} icon={faEye} />
                </Button>
              </Card>
              <Card
                style={{
                  height: "50px",
                  width: "50px",
                }}
              >
                <Button
                  className="p-2"
                  style={{
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <FontAwesomeIcon style={{ height: "100%", width: "100%" }} icon={faFilePen} />
                </Button>
              </Card>
              <Card
                style={{
                  height: "50px",
                  width: "50px",
                }}
              >
                <Button
                  className="p-2"
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "red"
                  }}
                  onClick={onDeleteClick}
                >
                  <FontAwesomeIcon style={{ height: "100%", width: "100%" }} icon={faTrashCan} />
                </Button>
              </Card>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ListBlogItem;