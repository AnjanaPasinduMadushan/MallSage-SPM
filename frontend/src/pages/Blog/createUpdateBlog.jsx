import { faImage, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import { createBlog, deleteUrlImg, getOneBlog, updateBlog } from '../../Api/services/blogService';
import { toast, ToastContainer } from 'react-toastify';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from '../../styles/blog-styles.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const CreateUpdateBlogPost = () => {
    const { id } = useParams();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        getBlogData(id)
    }, []);

    const navigate = useNavigate();
    // State variables
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    // Ref
    const authorNameInputRef = useRef(null);
    const contentInputRef = useRef(null);

    // Event handlers
    const handleAuthorNameChange = (e) => {
        setAuthorName(e.target.value);
    };

    const handleTitleClick = () => {
        setEditing(true);
    };

    const handleTitleBlur = () => {
        setEditing(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTitleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            setTitle(title.trim());
            authorNameInputRef.current.focus();
        }
    };

    const handleAuthorKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            contentInputRef.current.focus();
        }
    };

    const handleImageUpload = (e) => {
        const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
        const selectedFiles = e.target.files;
        const newImages = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            //Check and add only image files
            if (allowedExtensions.includes(fileExtension)) {
                const imageUrl = URL.createObjectURL(file);
                newImages.push({
                    id: Date.now() + i,
                    url: imageUrl,
                    name: file.name,
                    file: file
                });
            }
        }

        setImages([...newImages, ...images]);
        e.target.value = ''; // Clear the input field for re-uploading
    };

    const removeImage = (id) => {
        const updatedImages = images.filter((image) => image.id !== id);
        setImages(updatedImages);
    };

    const grayedOutTextClass = title === '' ? styles.textGray : '';

    // Api call to add blog to server
    const handleSubmit = async () => {
        console.log("submit pressed");

        var error;
        if (title == '') {
            error = 'Title required';
        } else if (authorName == '') {
            error = 'Author Name required';
        } else if (content == '' || content == '<p><br></p>') {
            error = 'Content cannot be empty';
        }

        // Validation toast
        if (error != null) {
            toast.error(error, {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
            return;
        }


        const toastId = toast.loading("Saving Blog...");
        var res;
        if (!id) {
            res = await createBlog(title, authorName, content, images);
        } else {
            res = await updateBlog(id, title, authorName, content, images);
        }

        if (res.status == 201) {
            toast.update(toastId, {
                render: "Blog Saved",
                type: "success",
                isLoading: false,
                autoClose: 1500,
            });

            setTimeout(() => {
                navigate('/showBlogs'); // Navigate back after a 2-second delay
            }, 1500);
        } else {
            var msg;
            if (res.status == 403) {
                msg = "Unauthorised! Please Login!"
            } else {
                msg = res.msg
            }

            toast.update(toastId, {
                render: msg,
                type: "error",
                isLoading: false,
                autoClose: 5000,
            });
        }

    }

    // Api call to get Blog data for [isUpdate]
    const getBlogData = async (id) => {
        if (id) {
            const res = await getOneBlog(id);

            setTitle(res.data.title);
            setAuthorName(res.data.author);
            setContent(res.data.content);
            setImageUrls(res.data.images);

            console.log(imageUrls)
        }
    }

    // Delete a image stored in firebase (only used in update)
    const deleteUrlImage = async (image) => {
        const toastId = toast.loading("Deleting Saved Image...");

        const res = await deleteUrlImg(id, image.name);
        if (res.status == 200) {
            toast.update(toastId, {
                render: "Image Removed!",
                type: "success",
                isLoading: false,
                autoClose: 1500,
            });

            const updatedImages = imageUrls.filter((img) => img._id !== image._id);
            setImageUrls(updatedImages);

        } else {
            toast.update(toastId, {
                render: "Couldn't delete Image",
                type: "error",
                isLoading: false,
                autoClose: 1500,
            });
        }
    }



    return (
        <>
            <ToastContainer />
            <Card
                className="p-3 mx-auto rounded-4"
                style={{ width: '70%', minWidth: '325px', marginTop: '100px', marginBottom: '40px' }}
            >
                <Card.Body>
                    {editing ? (
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            onBlur={handleTitleBlur}
                            placeholder="Enter Title"
                            autoFocus
                            onKeyDown={handleTitleKeyPress}
                        />
                    ) : (
                        <h3
                            className={`text-center ${grayedOutTextClass}`}
                            onClick={handleTitleClick}
                            style={{ cursor: 'pointer' }}
                        >
                            {title === ''
                                ? <u>{"Enter Your Title here!"}</u>
                                : title
                            }{" "}<FontAwesomeIcon icon={faPencil} />
                        </h3>
                    )}
                    <hr />

                    {/* Author Name */}
                    <div className="mb-3 mt-5">
                        <label htmlFor="authorName" className="form-label">
                            Author Name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="authorName"
                            value={authorName}
                            style={{ width: '50%', minWidth: '200px' }}
                            onChange={handleAuthorNameChange}
                            onKeyDown={handleAuthorKeyPress}
                            ref={authorNameInputRef}
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                            Blog Content:
                        </label>
                        <ReactQuill
                            value={content}
                            onChange={(value) => setContent(value)}
                            theme="snow"
                            ref={contentInputRef}
                        />
                    </div>

                    {/* Upload Images */}
                    <div className="mb-3">
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        <Button
                            variant="outline-primary"
                            onClick={() => document.getElementById('imageUpload').click()}
                        >
                            <FontAwesomeIcon icon={faImage} /> Upload Images
                        </Button>
                    </div>

                    {/* Uploaded Images */}
                    {(imageUrls.length > 0 || images.length > 0) && (
                        <>
                            <h4>Images:</h4>
                            <Table striped bordered hover>
                                <tbody>
                                    {/* Uploaded images */}
                                    {images.map((image) => (
                                        <tr key={image.id}>
                                            <td>{image.name}</td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeImage(image.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} /> Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Url Images */}
                                    {imageUrls.map((image) => (
                                        <tr key={image._id}>
                                            <td>{image.name}</td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    onClick={async () => deleteUrlImage(image)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} /> Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}

                    {/* Image carousel using react-image-gallery */}
                    {(imageUrls.length > 0 || images.length > 0) > 0 && (
                        <ImageGallery
                            items={[
                                ...images.map((image) => ({
                                    original: image.url,
                                    thumbnail: image.url,
                                    description: `Image ${image.name}`,
                                })),
                                ...imageUrls.map((image) => ({
                                    original: image.url,
                                    thumbnail: image.url,
                                    description: `Image ${image.name}`,
                                }))
                            ]}
                            showPlayButton={false}
                            showFullscreenButton={false}
                        />
                    )}
                </Card.Body>

                <Button variant="primary" style={{ width: "120px" }} onClick={handleSubmit} >
                    Submit
                </Button>

            </Card>
        </>
    );
};

export default CreateUpdateBlogPost;