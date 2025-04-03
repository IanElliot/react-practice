import React, { useEffect, useMemo, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const useFetchTasks = (): {
  data: Task[];
  loading: boolean;
  error: string;
} => {
  const [data, setData] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { data, loading, error };
};

const TaskManager: React.FC = () => {
  const [completedOnly, setCompletedOnly] = useState(false);

  useEffect(() => {}, []);

  const { data, loading, error } = useFetchTasks();

  const visibleTasks = useMemo(() => {
    return data.filter((task) => (completedOnly ? task.completed : true));
  }, [data, completedOnly]);

  return loading ? (
    <p>Is Loading...</p>
  ) : (
    <div>
      <h2>Task Manager</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={completedOnly}
              onChange={() => setCompletedOnly(!completedOnly)}
            />
            Show completed only
          </label>
          <ul>
            {visibleTasks.map((task) => (
              <li key={task.id}>
                {task.title} {task.completed ? "✅" : "❌"}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskManager;
