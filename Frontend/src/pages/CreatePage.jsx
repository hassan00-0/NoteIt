import React, { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !content.trim()) {
        toast.error("All fields are required!");
      }
      setIsLoading(true);
      await axios.post("/api/notes", {
        title,
        content,
      });
      toast.success("Note created sucessfully!");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("calm down, you are sending too many requests", {
          duration: 4000,
        });
      } else {
        toast.error("failed to create Note, try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="px-4 py-8 max-w-2xl mx-auto">
        <Link to={"/"} className="btn btn-ghost mb-4">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl card-title mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  type="text"
                  className="textarea textarea-bordered w-full"
                  placeholder="Write your Note here..."
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="mt-4 btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
