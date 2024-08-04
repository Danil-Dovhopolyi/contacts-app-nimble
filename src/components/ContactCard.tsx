import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { IContact } from "../types/IContact";

interface ContactCardProps {
  contact: IContact;
  onDelete: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete }) => {
  const navigate = useNavigate();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(contact.id);
  };

  return (
    <div
      className="flex items-center p-4 bg-gray-700 rounded-md shadow-md hover:bg-gray-600 cursor-pointer"
      onClick={() => navigate(`/contact/${contact.id}`)}
    >
      <div className="flex-shrink-0">
        <img
          src={contact.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex-grow ml-4">
        <div className="text-lg font-semibold">{`${contact.firstName} ${contact.lastName}`}</div>
        <div className="text-sm text-gray-400">{contact.email}</div>
      </div>
      <button
        onClick={handleDeleteClick}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default ContactCard;
