import React, { useState } from "react";
import Image from "next/future/image";
import DefaultImage from "../public/images/default.png";
import { collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";

const ChatCard = ({ chatData, onDelete }) => {
  const [user] = useAuthState(auth);
  const reciverEmail = chatData?.data()?.users?.filter((item) => item !== user?.email)?.[0];
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", reciverEmail));
  const [userSnapShot] = useCollection(q);
  const name = userSnapShot?.docs?.[0]?.data()?.name;
  const imageURL = userSnapShot?.docs?.[0]?.data()?.imageURL;
  const online = userSnapShot?.docs?.[0]?.data()?.online;

  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this chat?");
    if (confirmDelete) {
      const chatRef = doc(db, "chats", chatData.id);
      await deleteDoc(chatRef);
      if (onDelete) onDelete(); // Call onDelete if provided
    }
  };

  return (
    <Link href={`/chats/${chatData?.id}`}>
      <div className="w-full flex items-center py-3 px-5 border-b rounded-xl border-[#353535] space-x-6 cursor-pointer hover:bg-[#1d1d1d] relative">
        <div className="rounded-full w-[55px] h-[55px] relative">
          <Image
            src={imageURL || DefaultImage}
            alt=""
            width={55}
            height={55}
            priority={true}
            quality={100}
            className="rounded-full"
          />
          {online && <span className="w-3 h-3 bg-green-500 rounded-full absolute z-[999] bottom-1 right-0"></span>}
        </div>
        <span className="flex-grow">{name || "User"}</span>

        {/* Three Dots Icon */}
        <div className="relative ml-auto">
          <button onClick={() => setShowOptions(!showOptions)} className="text-gray-400 hover:text-gray-600">
            •••
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-md p-2">
              <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                Delete Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
