import {
  Routes,
  Route,
} from "react-router-dom";
import Contact from './components/Contact';
import Update from './components/Update';
import Create from './components/Create';
import './App.css';
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Contact />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/create" element={<Create />} />
  </Routes>
  );
}

export default App;
