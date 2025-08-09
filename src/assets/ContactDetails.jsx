// src/assets/ContactDetails.jsx
import React, { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../db';

export default function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchContact() {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContact(docSnap.data());
      } else {
        navigate('/');
      }
    }
    fetchContact();
  }, [id, navigate]);

  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await deleteDoc(doc(db, 'contacts', id));
      navigate('/');
    }
  }

  if (!contact) return <div>Loading...</div>;

  return (
    <div>
      <h2>Contact Details</h2>
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Email:</strong> {contact.email}</p>

      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
      <br />
      <Link to="/">Back to List</Link>
    </div>
  );
}
