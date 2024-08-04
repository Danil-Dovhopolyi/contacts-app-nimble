import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IContact } from "../types/IContact";

const API_URL = "https://live.devnimble.com/api/v1/";
const TOKEN = "VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn";

const ContactPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<IContact | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      const response = await axios.get<IContact>(`${API_URL}contact/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      setContact(response.data);
      setTags(response.data.tags);
    };
    fetchContact();
  }, [id]);

  const handleAddTag = async () => {
    const updatedTags = [...tags, newTag];
    await axios.put(
      `${API_URL}contact/${id}/tags`,
      { tags: updatedTags },
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    );
    setTags(updatedTags);
    setNewTag("");
  };

  if (!contact) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-800 text-white min-h-screen">
      <div className="flex items-center mb-4">
        <img
          src={contact.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full"
        />
        <div className="ml-4">
          <div className="text-2xl font-semibold">{`${contact.firstName} ${contact.lastName}`}</div>
          <div className="text-lg text-gray-400">{contact.email}</div>
        </div>
      </div>
      <div>
        <div className="mb-4">Tags:</div>
        <div className="flex flex-wrap space-x-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-700 p-2 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-grow p-2 rounded-md bg-gray-700 text-white"
            placeholder="Add new tag"
          />
          <button
            onClick={handleAddTag}
            className="p-2 rounded-md bg-blue-600 hover:bg-blue-700"
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
