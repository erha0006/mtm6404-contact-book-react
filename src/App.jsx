import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactList from './assets/ContactList';
import ContactDetails from './assets/ContactDetails';
import ContactForm from './assets/ContactForm';

function App() {
  return (
<BrowserRouter basename="/mtm6404-contact-book-react/">
<Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/new" element={<ContactForm />} />
        <Route path="/edit/:id" element={<ContactForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
