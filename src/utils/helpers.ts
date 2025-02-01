// Filter task count items
export function filterTaskCount(task, taskCategory) {
  const filterTask =
    task &&
    task.filter((item) => {
      if (!item.category) return false;
      const totalCategory = item.category === taskCategory;
    });
  return filterTask.length;
}

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
