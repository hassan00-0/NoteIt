import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimit from "../components/RateLimit.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";

const Homepage = () => {
  const [isRateLimited, setIsRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/api/notes");
        setNotes(res.data);
        setIsRatelimited(false);
      } catch (error) {
        if (error.response.status === 429) {
          setIsRatelimited(true);
        } else {
          toast.error("failed to load notes.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimit />}
      <div className="max-w-6xl mx-auto p-4 mt-6">
        {isLoading && <div className="text-primary py-8">Loading Notes...</div>}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
