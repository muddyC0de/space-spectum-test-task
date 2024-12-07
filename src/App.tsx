import React from "react";
import { Container, CreateTaskInput, TasksList } from "./components/shared";
import {
  addIdCounter,
  addItem,
  fetchAllTasks,
} from "./store/slices/task-slice";
import { RootState, useAppDispatch } from "./store/store";
import { useSelector } from "react-redux";
import { Button } from "./components/ui";

function App() {
  const dispatch = useAppDispatch();
  const idCounter = useSelector(
    (state: RootState) => state.taskSlice.idCounter
  );
  const [value, setValue] = React.useState("");

  const handleAddTask = async (title: string) => {
    dispatch(
      addItem({
        title,
        completed: false,
        userId: idCounter,
        id: idCounter,
      })
    );

    dispatch(addIdCounter());

    setValue("");
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(fetchAllTasks());
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Container className="flex flex-col gap-2 mt-40">
        <div className="flex items-center">
          <span className="text-[40px]">💼</span>
          <h1 className="text-[48px] font-bold ">Todo List</h1>
        </div>
        <p className="text-[17px]">👋 Welcome to your Todo List </p>
        <div className="flex items-center gap-3 justify-between">
          <CreateTaskInput
            className="flex-1 w-full"
            value={value}
            setValue={setValue}
          />
          <Button onClick={() => handleAddTask(value)}>Add Task</Button>
        </div>
        <TasksList itemsPerPage={10} />
      </Container>
    </div>
  );
}

export default App;
