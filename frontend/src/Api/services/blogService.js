// import { apiClient } from "../axios/api";

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

export const getAllBlogs = async () => {
  try {
    const data = await apiClient.get('blog/readAll');

    return { message: "success", data: data.data.blogs };
  } catch (err) {
    console.log(err);
    return { message: "error", data: err };
  }
}