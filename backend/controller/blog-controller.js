import Blog from "../model/blog-model.js";

const createBlog = async (req, res) => {
  console.log("blog data received")
  const shop = req.userId;
  const {
    title,
    content,
    author
  } = req.body;

  console.log({ title: title, content: content, author: author, files: req.files });

  let blog;
  try {
    blog = new Blog({
      title,
      content,
      shop,
      author,
      createdDate: Date.now(),
    })
    await blog.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to create blog", error: err });
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to create blog", error: err });
  }

  return res.status(201).json({ message: "Blog successfully created!" });
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