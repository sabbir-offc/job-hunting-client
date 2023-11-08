import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const axios = useAxios();
  const handleUpload = async (e) => {
    e.preventDefault();
    const blog = {
      thumbnail,
      title,
      description,
    };

    await axios.post("/blogs", blog).then((res) => console.log(res.data));
  };
  return (
    <div className="max-w-7xl mx-auto text-center my-10">
      <h2 className="text-3xl mb-5">Create Blog</h2>
      <form onSubmit={handleUpload}>
        <div className="max-w-sm mx-auto">
          <input
            type="url"
            name="thumbnail"
            onBlur={(e) => setThumbnail(e.target.value)}
            placeholder="Blog Thumbnail"
            className="input input-bordered input-primary w-full mb-5"
          />
        </div>
        <div className="max-w-sm mx-auto">
          <input
            type="text"
            onBlur={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Blog Title"
            className="input input-bordered input-primary w-full mb-5"
          />
        </div>
        <div className="max-w-sm mx-auto">
          <textarea
            name="description"
            id=""
            onBlur={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Blog Description"
            className="textarea textarea-primary w-full"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
