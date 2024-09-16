import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";
import { formatDate } from "../../../util/formatDate";


const ListBlogItem = ({ blog }) => {
  // prop validations
  ListBlogItem.propTypes = {
    blog: PropTypes.shape({
      title: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
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
              src={"https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg"}
              alt="Card"
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                borderRadius: 'inherit',
              }}
            />
          </div>

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
                    width: "100%"
                  }}
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