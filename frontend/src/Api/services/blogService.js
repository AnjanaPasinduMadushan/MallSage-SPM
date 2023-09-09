// import { apiClient } from "../axios/api";

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

  const response = await fetch('http://localhost:5000/blog/create', {
    method: 'POST',
    body: formData,
    credentials:'include',
  });
  return response.data;
};
