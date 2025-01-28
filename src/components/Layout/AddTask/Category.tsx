export default function Category() {
  const categories = ["Project", "Appointment", "Tasks", "Notes", "Others"];

  return (
    <main className="">
      <select className="font-medium text-[#a4c6ed] p-2" defaultValue="">
        {categories.map((category) => (
          <option
            key={category}
            value={category}
            className="bg-[#1e1f21] text-white">
            {category}
          </option>
        ))}
      </select>
    </main>
  );
}
