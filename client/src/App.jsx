import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Library Borrowing System</h1>} />
      </Routes>
    </BrowserRouter>
  );
}