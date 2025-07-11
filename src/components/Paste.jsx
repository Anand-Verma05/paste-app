import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Eye,
  Trash2,
  Share2,
  ClipboardCopy,
  Pencil
} from "lucide-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleShare = (pasteId) => {
    const link = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="p-4">
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 bg-black text-white"
        type="search"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div
              className="border border-gray-600 rounded-2xl p-4 flex justify-between items-start bg-gray-900 text-white"
              key={paste?._id}
            >
              {/* Left: Title + content */}
              <div className="flex flex-col w-[70%]">
                <h2 className="text-2xl font-semibold">{paste.title}</h2>
                <p className="text-sm mt-1 text-gray-300 line-clamp-2">
                  {paste.value}
                </p>
                
              </div>
              <div className="flex flex-col gap-3">
              {/* Right: Icon buttons */}
              <div className="flex flex-row gap-3 items-center">
                <Link to={`/?pasteId=${paste._id}`} title="Edit">
                  <Pencil className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
                </Link>

                <Link to={`/pastes/${paste._id}`} title="View">
                  <Eye className="w-5 h-5 hover:text-green-400 cursor-pointer" />
                </Link>

                <ClipboardCopy
                  title="Copy"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.value);
                    toast.success("Copied to clipboard");
                  }}
                  className="w-5 h-5 hover:text-yellow-400 cursor-pointer"
                />

                <Trash2
                  title="Delete"
                  onClick={() => handleDelete(paste?._id)}
                  className="w-5 h-5 hover:text-red-500 cursor-pointer"
                />

                <Share2
                  title="Share"
                  onClick={() => handleShare(paste?._id)}
                  className="w-5 h-5 hover:text-purple-400 cursor-pointer"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                  {formatDate(paste.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
