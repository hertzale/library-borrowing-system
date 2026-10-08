import BookSearch from '../components/student/BookSearch';

export default function StudentHome({ student }) {
  return (
    <div>
      <h2>Welcome, {student?.name}</h2>
      <BookSearch onSearch={(q) => console.log('search:', q)} />
    </div>
  );
}
