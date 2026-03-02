import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Toaster />

      <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <div className="relative z-0">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
