import axios from "axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const NoteDetailPage = () => {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`/api/notes/${id}`);
        setNotes(res.data);
      } catch {
        toast.error("failed to load Notes!");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <LoaderIcon className="animate-spin size-10 text-primary" />

        <p className="text-xl font-bold">Loading Note...</p>
      </div>
    );
  }
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`/api/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete note.");
    }
  };
  const handleSave = async () => {
    if (!notes.title.trim() || !notes.content.trim()) {
      toast.error("Please add a little or content.");
      return;
    }
    setSave(true);
    try {
      await axios.put(`/api/notes/${id}`, notes);
      toast.success("Note updated successfully");
      navigate("/");
    } catch {
      toast.error("Failed to update Note.");
    } finally {
      setSave(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="flex btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4 flex flex-col">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Note title"
                  value={notes.title}
                  onChange={(e) =>
                    setNotes({ ...notes, title: e.target.value })
                  }
                />
              </div>

              <div className="form-control flex flex-col mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full p-4"
                  placeholder="Note contents"
                  value={notes.content}
                  onChange={(e) => {
                    setNotes({ ...notes, content: e.target.value });
                  }}
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={save}
                  onClick={handleSave}
                >
                  {save ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
