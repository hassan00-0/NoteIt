import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted sucessfully!");
    } catch {
      toast.error("Failed to delete note");
    }
  };
  return (
    <Link
      to={`/notes/${note._id}`}
      className="card bg-base-300 shadow-sm hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] block"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="flex justify-between items-center">
          <span>{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-4">
            <PenSquareIcon className="size-5" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => {
                handleDelete(e, note._id);
              }}
            >
              <Trash2Icon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
