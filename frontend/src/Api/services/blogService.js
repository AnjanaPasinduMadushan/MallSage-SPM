import { apiClient } from "../axios/api";

/**
 * Create a new blog.
 *
 * @param {string} title - The title of the blog.
 * @param {string} author - The author of the blog.
 * @param {string} content - The content of the blog.
 * @param {Array<{ file: File }>} images - An array of image files to upload.
* @returns {Promise<{ status: number, msg: string }>} A promise that resolves with the response data.
*/
export const createBlog = async (title, author, content, images) => {
  try {
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
  } catch (e) {
    console.log(e);
    return { message: "error", data: e };
  }
}

/**
 * Get all blogs created by the current logged-in user (shop).
 *
 * @returns {Promise<{ message: string, data: Array<any> }>} A promise that resolves with the response data.
 */
export const getShopBlogs = async () => {
  try {
    const data = await apiClient.get('blog/getBlogs');

    return { message: "success", data: data.data.blogs };
  } catch (err) {
    console.log(err);
    return { message: "error", data: err };
  }
}

/**
 * Delete the given blog.
 *
 * @param {string} id - The ID of the blog to delete.
 * @returns {Promise} A promise.
 */
export const deleteBlog = async (id) => {
  try {
    const res = await apiClient.delete(`blog/remove/${id}`);

    return res;
  } catch (e) {
    console.log(e);
    return { status: 400, msg: "error", err: e };
  }
}

/**
 * Get one blog by ID.
 *
 * @param {string} id - The ID of the blog to retrieve.
 * @returns {Promise<{ status: number, msg: string, data: any }>} A promise that resolves with the response data.
 */
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

/**
 * Delete a single image that was already uploaded before (used in update).
 *
 * @param {string} blogId - The ID of the blog containing the image.
 * @param {string} imgName - The name of the image to delete.
 * @returns {Promise<{ status: number, msg: string }>} A promise that resolves with the response data.
 */
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

/**
 * Update a blog.
 *
 * @param {string} id - The ID of the blog to update.
 * @param {string} title - The updated title of the blog.
 * @param {string} authorName - The updated author of the blog.
 * @param {string} content - The updated content of the blog.
 * @param {Array<{ file: File }>} images - An array of image files for update.
* @returns {Promise<{ status: number, msg: string }>} A promise that resolves with the response data.
*/
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
    var stat;
    if (response.status == 200) {
      stat = 201
    }
    return { status: stat, msg: response.statusText }
  } catch (e) {
    console.log(e);
    return { status: 400, msg: "error", err: e };
  }
}

export const getAllBlogs = async () => {
  try {
    const res = await apiClient.get("blog/getAll");

    if (res.status === 200) {
      return { status: 200, success: true, data: res.data.blogs };
    } else {
      return { status: res.status, success: false, error: "Failed to retrieve blogs" };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, error: "Error in fetching blogs", err: error };
  }
};
