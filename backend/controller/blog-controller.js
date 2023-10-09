import Blog from "../model/blog-model.js";
import FirebaseStorage from "../configs/firebaseConfig.js";

const createBlog = async (req, res) => {
  const shop = req.userId;
  const { title, content, author } = req.body;
  const imageUrls = [];
  let blog;

  try {
    // Loop through each uploaded image file
    for (const file of req.files) {
      const imageBuffer = file.buffer; // Access the image data
      const imageName = file.originalname;

      // Generate a unique name for the image using current timestamp
      const dateTime = Date.now();
      const imageFileName = `${dateTime}-${imageName}`;

      // Create a reference to the Firebase Storage file
      const fireFile = FirebaseStorage.file(imageFileName);

      // Upload the image buffer to Firebase Storage
      await fireFile.save(imageBuffer, {
        contentType: 'image/png', // Set the appropriate content type
      });

      // Generate a signed URL for the uploaded image (with an expiration date)
      const signedUrl = await fireFile.getSignedUrl({
        action: 'read',
        expires: '03-01-2500', // Set an appropriate expiration date
      });

      // Store the signed URL in the array
      imageUrls.push(signedUrl.toString());
    }

    // Create a new Blog document with the uploaded images' URLs
    blog = new Blog({
      title,
      content,
      shop,
      author,
      createdDate: Date.now(),
      images: imageUrls,
    });

    // Save the Blog document to the database
    await blog.save();

    // Respond with a success message
    return res.status(201).json({ message: "Blog successfully created!" });
  } catch (err) {
    // Handle errors and provide an error response
    console.error(err);
    return res.status(500).json({ message: "Unable to create blog", error: err });
  }
};


const getBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found!", id: blogId })
    } else {
      res.status(200).json({ blog })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in getting Blog", error: err })
  }
}

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) {
      return res.status(404).json({ message: "Blogs not found" })
    } else {
      res.status(200).json({ blogs })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in retrieving Blogs" })
  }
}

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndDelete(id)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in deleting Blog", error: err })
  }

  if (!blog) {
    return res.status(404).json({ message: "Blog not found!" })
  }

  return res.status(200).json({ message: "Blog deleted successfully" })
}

const updateBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "error in updating blog!", error: err })
  }

  if (!blog) {
    return res.status(404).json({ message: "Blog not found! Unable to update" })
  }

  return res.status(200).json({ message: "Blog Updated successfully" })
}

export { createBlog, getBlog, getBlogs, deleteBlog, updateBlog }