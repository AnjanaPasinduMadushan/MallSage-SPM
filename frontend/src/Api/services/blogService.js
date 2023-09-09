import { apiClient } from "../axios/api";

//Create new Blog
export const createBlog = async (title, author, content) =>{

  const response = await apiClient.post('blog/create', {
    title: title,
    author: author,
    content: content,
  });
  return response.data;
};
