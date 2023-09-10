import { faImage, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import { createBlog } from '../../Api/services/blogService';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from '../../styles/blog-styles.module.css';

const CreateBlogPost = () => {

    // State variables
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

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
        if (e.key === 'Enter') {
            setTitle(title.trim());
            authorNameInputRef.current.focus();
        }
    };

    const handleAuthorKeyPress = (e) => {
        if (e.key === 'Enter') {
            contentInputRef.current.focus();
        }
    };

    const handleImageUpload = (e) => {
        const selectedFiles = e.target.files;
        const newImages = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];

            const imageUrl = URL.createObjectURL(file);
            newImages.push({
                id: Date.now() + i,
                url: imageUrl,
                name: file.name,
                file: file
            });
        }

        setImages([...images, ...newImages]);
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

        try {
            const res = await createBlog(title, authorName, content, images);

            if (res) {
                console.log({ msg: "success", data: res });
            } else {
                console.error({ msg: "error", data: res });
            }
        } catch (err) {
            console.error(err);
        }
    }



    return (
        <Card
            className="p-3 mx-auto my-5 rounded-4"
            style={{ width: '70%', minWidth: '325px' }}
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
                    <label htmlFor="imageUpload" className="form-label">
                        Upload Images:
                    </label>
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
                {images.length > 0 && (
                    <>
                        <h4>Uploaded Images:</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Image Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
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
                            </tbody>
                        </Table>
                    </>
                )}

                {/* Image carousel using react-image-gallery */}
                {images.length > 0 && (
                    <ImageGallery
                        items={images.map((image) => ({
                            original: image.url,
                            thumbnail: image.url,
                            description: `Image ${image.name}`,
                        }))}
                        showPlayButton={false}
                        showFullscreenButton={false}
                    />
                )}
            </Card.Body>

            <Button variant="primary" style={{ width: "120px" }} onClick={handleSubmit} >
                Submit
            </Button>

        </Card>
    );
};

export default CreateBlogPost;