import React from 'react'
import {Link} from 'react-router-dom'
import {
  Eye,
  Trash2,
  Share2,
  ClipboardCopy,
  Pencil
} from "lucide-react";
const Changebg = () => {
function changebgg() {
  const currentColor = document.body.style.backgroundColor;
  if (currentColor === 'white') {
    document.body.style.backgroundColor = ''; // Goes back to index.css color
  } else {
    document.body.style.backgroundColor = 'white';
  }
}
  return (
    <div>
      <button>
        <Eye   title="Delete"
                  onClick={changebgg}
                //   className="w-5 h-5 hover:text-red-500 cursor-pointer"
                  className="w-5 h-5 hover:text-black cursor-pointer"
                  />

       
      </button>
    </div>
  )
}




export default Changebg
