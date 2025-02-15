export function filterTaskCount(tasks, taskCategory) {
  // Ensure tasks exist
  if (!tasks) return 0;

  const today = new Date();
  // Normalize today's date
  today.setHours(0, 0, 0, 0);

  const filteredTasks = tasks.filter((task) => {
    // Ensure required fields exist
    if (!task.taskCategory || !task.scheduleStart) return false;

    const taskDate = new Date(task.scheduleStart);
    // Normalize task date for comparison
    taskDate.setHours(0, 0, 0, 0);

    return task.taskCategory === taskCategory && taskDate >= today;
  });

  return filteredTasks.length;
}
// export function filterTaskCount(task, taskCategory) {
//   const filterTask =
//     task &&
//     task.filter((item) => {
//       if (!item.category) return false;
//       const totalCategory = item.category === taskCategory;
//     });
//   return filterTask.length;
// }

export function filterTodayTaskCount(tasks) {
  if (!tasks) return 0;
  const todaysTask =
    tasks &&
    tasks.filter((task) => {
      // Ensure task.scheduleStart is not undefined
      if (!task.scheduleStart) return false;
      const taskDate = new Date(task.scheduleStart);
      const today = new Date();

      return (
        taskDate.getFullYear() === today.getFullYear() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getDate() === today.getDate()
      );
    });
  return todaysTask.length;
}

export function formatDayMonth(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();

  // Add ordinal suffix
  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${getOrdinal(day)}`;
}

// Filter tasks for specific time
export function filterTasksByDay(
  tasks,
  filterType: "past" | "today" | "upcoming"
) {
  if (!tasks || !Array.isArray(tasks)) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of the day

  return tasks.filter((task) => {
    if (!task.scheduleStart) return false;

    const taskDate = new Date(task.scheduleStart);
    taskDate.setHours(0, 0, 0, 0); // Normalize to start of the day

    if (filterType === "today") {
      return taskDate.getTime() === today.getTime();
    }
    if (filterType === "past") {
      return taskDate.getTime() < today.getTime();
    }
    if (filterType === "upcoming") {
      return taskDate.getTime() > today.getTime();
    }

    return false;
  });
}

export function extractTextFromHtml(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
