import { apiClient } from "../axios/api";

//Create new Blog
export const createBlog = async (title, author, content, images) => {
  let formData = new FormData();
  formData.append('title', title);
  formData.append('author', author);
  formData.append('content', content);
  // Append images to formData
  images.forEach((image) => {
    formData.append(`image`, image.file);
  });

  const response = await fetch('http://localhost:5050/blog/create', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  return { status: response.status, msg: response.statusText }
}

//Get all blogs created by current logged in user(shop)
export const getAllBlogs = async () => {
  try {
    const data = await apiClient.get('blog/getBlogs');

    return { message: "success", data: data.data.blogs };
  } catch (err) {
    console.log(err);
    return { message: "error", data: err };
  }
}

//Delete the given Blog
export const deleteBlog = async (id) => {
  try {
    const res = await apiClient.delete(`blog/remove/${id}`);

    return res;
  } catch (e) {
    console.log(e);
    return { status: 400, msg: "error", err: e };
  }
}

//Get one Blog
export const getOneBlog = async (id) => {
  try {
    const res = await apiClient.get(`blog/getOne/${id}`);
    if (res.status == 200) {
      return { status: 200, msg: "success", data: res.data.blog }
    } else {
      return { status: 400, msg: "error", data: res }
    }
  } catch (e) {
    console.log(e);
    return { status: 400, msg: "error", err: e };
  }
}

//delete a single image that was already uploaded before(used in update)
export const deleteUrlImg = async (blogId, imgName) => {

  try {
    const res = await apiClient.delete(`blog/removeImg/${blogId}/${imgName}`);
    if (res.status == 200) {
      return { status: 200, msg: "success" }
    } else {
      return { status: 400, msg: res.message }
    }
  } catch (e) {
    console.log(e);
    return { status: 400, msg: "error", err: e };
  }
}

export const updateBlog = async (id, title, authorName, content, images) => {
  try {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('author', authorName);
    formData.append('content', content);
    // Append images to formData
    images.forEach((image) => {
      formData.append(`image`, image.file);
    });

    const response = await fetch(`http://localhost:5050/blog/update/${id}`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    var stat ;
    if (response.status == 200) {
     stat = 201
    }
    return { status: stat, msg: response.statusText }
  } catch (e) {
    console.log(e);
    return { status: 400, msg: "error", err: e };
  }
}