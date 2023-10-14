import Blog from "../model/blog-model.js";
import FirebaseStorage from "../configs/firebaseConfig.js";

// Creates a new Blog
const createBlog = async (req, res) => {
  const shop = req.userId;
  const { title, content, author } = req.body;
  const imageUrls = [];
  let blog;

  try {
    // Loop through each uploaded image file
    for (const file of req.files) {
      const imageBuffer = file.buffer;
      const imageName = file.originalname;

      // Generate a unique name for the image using the current timestamp
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

    // Respond with a success message and a 201 status (Resource Created)
    return res.status(201).json({ message: "Blog successfully created!" });
  } catch (err) {
    // Handle errors and provide an error response
    console.error(err);
    return res.status(500).json({ message: "Unable to create blog", error: err });
  }
};


// Returns all blogs that were created by this user in this account
const getShopBlogs = async (req, res) => {
  const shop = req.userId;

  try {
    // Attempt to find blogs for the specific shop
    const blogs = await Blog.find({ shop: shop });

    if (blogs && blogs.length > 0) {
      // Check if any blogs were found for the shop
      return res.status(200).json({ blogs });
    } else {
      // If no blogs were found, return a 404 status
      return res.status(404).json({ message: "No blogs found for the shop" });
    }
  } catch (err) {
    // Handle database query errors
    console.error(err);
    return res.status(500).json({ message: "Error in retrieving Blogs", error: err });
  }
};


//Delete a Blog and remove its images
const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let data;

  try {
    // Attempt to delete the blog from the database
    data = await Blog.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in deleting Blog", error: err });
  }

  if (!data) {
    return res.status(404).json({ message: "Blog not found!" });
  }

  // Loop through and delete associated images from Firebase Storage
  data.images.forEach(img => {
    FirebaseStorage.file(img.name).delete()
      .then(() => {
        console.log('File deleted successfully');
      })
      .catch(err => {
        console.error('Error deleting one or more images:', err);
      });
  });

  return res.status(200).json({ message: "Blog deleted successfully" });
};


//update blog
const updateBlog = async (req, res, next) => {
  const id = req.params.id;
  const shop = req.userId;
  const { title, content, author } = req.body;
  const imageUrls = [];
  let blog;


  // Loop through each uploaded image file
  for (const file of req.files) {
    const imageBuffer = file.buffer;
    const imageName = file.originalname;

    // Generate a unique name for the image using the current timestamp
    const dateTime = Date.now();
    const imageFileName = `${dateTime}-${imageName}`;

    try {
      // Upload the image buffer to Firebase Storage
      const fireFile = FirebaseStorage.file(imageFileName);
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
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error in uploading image", error: err });
    }
  }

  try {
    // Attempt to update the blog in the database
    blog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: { ...req.body },
        $push: { images: { $each: imageUrls, $position: 0 } }
      },
      { new: true }
    )

    if (!blog) {
      return res.status(404).json({ message: "Blog not found! Unable to update" });
    }

    return res.status(200).json({ message: "Blog updated successfully", blog: blog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in updating blog", error: err });
  }
};

//Deleting saved image from firebase
const deleteImg = async (req, res, next) => {
  const ImgName = req.params.name;
  const id = req.params.id;

  try {
    // Remove the image reference from the blog in the database
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $pull: { images: { name: ImgName } } },
      { new: true } // Corrected option for returning the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in deleting saved image", error: err });
  }

  try {
    // Delete the image from Firebase Storage
    await FirebaseStorage.file(ImgName).delete();
    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in deleting image from storage", error: err });
  }
};


// get a single Blog
const getBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    // Attempt to find the blog by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      // If no blog is found, return a 404 status and a message
      return res.status(404).json({ message: "Blog not found!", id: blogId });
    }

    // If the blog is found, return a 200 status and the blog data
    return res.status(200).json({ blog });
  } catch (err) {
    // Handle any errors that occur during the database query
    console.error(err);
    return res.status(500).json({ message: "Error in getting Blog", error: err });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await Blog.find();

    // Check if any blogs were found
    if (blogs && blogs.length > 0) {
      return res.status(200).json({ blogs });
    } else {
      // No blogs found
      return res.status(404).json({ message: "No blogs found in the database" });
    }
  } catch (err) {
    // Handle database query errors
    console.error(err);
    return res.status(500).json({ message: "Error in fetching blogs", error: err });
  }
};


export { createBlog, getBlog, getShopBlogs, deleteBlog, updateBlog, deleteImg, getAllBlogs }