import clsx from "clsx";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import {
  editItem,
  removeItem,
  toggleTaskCompleted,
} from "store/slices/task-slice";
import { useAppDispatch } from "store/store";
import { Button } from "../ui/button";

export interface ITaskItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  item: ITaskItem;
  className?: string;
}

export const TaskItem: React.FC<Props> = ({ item, className }) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = React.useState(false);
  const [editValue, setEditValue] = React.useState(item.title);

  const handleEdit = () => {
    dispatch(editItem({ id: item.id, title: editValue }));
    setIsEdit(false);
  };

  return (
    <div
      className={clsx(
        "flex  relative items-center group justify-between p-3 border rounded-lg bg-white hover:bg-gray-100 transition-colors duration-200",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {!isEdit ? (
          <>
            <input
              className={clsx(
                "h-5 w-5 rounded border-gray-300 cursor-pointer transition-colors duration-200",
                item.completed
                  ? "bg-[#37352f] border-[#37352f] text-white"
                  : "hover:border-[#37352f]"
              )}
              checked={item.completed}
              onChange={() => dispatch(toggleTaskCompleted(item.id))}
              type="checkbox"
            />
            <p
              className={clsx(
                "text-base font-medium text-gray-800 transition-colors duration-200",
                item.completed && "line-through text-gray-400"
              )}
            >
              {item.title}
            </p>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Edit task..."
              className="bg-transparent outline-none"
              type="text"
            />
            <Button className="absolute right-2 w-24" onClick={handleEdit}>
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Trash2
          onClick={() => dispatch(removeItem(item.id))}
          className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200"
          size={20}
        />
        <Pencil
          onClick={() => setIsEdit(!isEdit)}
          className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors duration-200"
          size={20}
        />
      </div>
    </div>
  );
};
