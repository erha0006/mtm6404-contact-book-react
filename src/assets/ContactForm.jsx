// src/assets/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../db';

export default function ContactForm({ editMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (editMode && id) {
      async function fetchContact() {
        const docRef = doc(db, 'contacts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          navigate('/');
        }
      }
      fetchContact();
    }
  }, [editMode, id, navigate]);

  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editMode) {
      const docRef = doc(db, 'contacts', id);
      await updateDoc(docRef, formData);
      navigate(`/contact/${id}`);
    } else {
      const colRef = collection(db, 'contacts');
      const docRef = await addDoc(colRef, formData);
      navigate(`/contact/${docRef.id}`);
    }
  }

  return (
    <div>
      <h2>{editMode ? 'Edit Contact' : 'New Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />
        </label>
        <br />
        <button type="submit">{editMode ? 'Update' : 'Add'} Contact</button>
      </form>
    </div>
  );
}
