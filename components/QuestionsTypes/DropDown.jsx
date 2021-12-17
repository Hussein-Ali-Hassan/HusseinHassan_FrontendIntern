const types = ["Single Choice", "Multiple Choice", "Paragraph"];

export default function QuestionsTypes({ setType }) {
  return (
    <select onChange={(e) => setType(e.target.value)}>
      {types.map((type) => (
        <option value={type}>{type}</option>
      ))}
    </select>
  );
}
