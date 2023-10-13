import Blog from "../model/blog-model.js";
import FirebaseStorage from "../configs/firebaseConfig.js";

// Creates a new Blog
const createBlog = async (req, res) => {
  const shop = req.userId;
  const { title, content, author } = req.body;
  var imageUrls = [];
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
      imageUrls.push({ name: imageFileName, url: signedUrl.toString() });
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

// Returns all blogs that were created by this user in this account
const getAllBlogs = async (req, res) => {
  const shop = req.userId;
  try {
    const blogs = await Blog.find({ shop: shop });

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

//Delete a Blog and remove its images
const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let data;

  try {
    data = await Blog.findByIdAndDelete(id);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: "Error in deleting Blog", err: err })
  }

  if (!data) {
    return res.status(404).json({ msg: "Blog not found!" })
  }

  data.images.forEach(img => {
    FirebaseStorage.file(img.name).delete().then(() => {
      console.log('File deleted successfully');
    }).catch(() => {
      console.error('Error deleting one or more images');
    });
  });

  return res.status(200).json({ msg: "Blog deleted successfully" })
}

//update blog
const updateBlog = async (req, res, next) => {
  const id = req.params.id;
  const shop = req.userId;
  const { title, content, author } = req.body;
  const imageUrls = [];
  let blog;


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
    imageUrls.push({ name: imageFileName, url: signedUrl.toString() });
  }

  const data = req.body;

  try {
    blog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: { ...req.body },
        $push: { images: { $each: imageUrls } }
      },
      { new: true }
    )
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "error in updating blog!", error: err })
  }

  if (!blog) {
    return res.status(404).json({ message: "Blog not found! Unable to update" })
  }

  return res.status(200).json({ message: "Blog Updated successfully" })
}

//Deleting saved image from firebase
const deleteImg = async (req, res, next) => {
  const ImgName = req.params.name;
  const id = req.params.id;

  try {
    await Blog.findByIdAndUpdate(
      id,
      { $pull: { images: { name: ImgName } } },
      { newz: true }
    )
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "error in deleting saved image", error: err })
  }

  FirebaseStorage.file(ImgName).delete().then(() => {
    return res.status(200).json({ message: "Image deleted successfully" })
  }).catch(() => {
    return res.status(500).json({ message: "Error in deleting image" })
  });
}

const getBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found!", id: blogId })
    } else {
      return res.status(200).json({ blog })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in getting Blog", error: err })
  }
}

export { createBlog, getBlog, getAllBlogs, deleteBlog, updateBlog, deleteImg }