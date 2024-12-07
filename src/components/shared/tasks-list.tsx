import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import ReactPaginate from "react-paginate";
import { TaskItem } from "./task-item";

interface Props {
  itemsPerPage: number;
}

export const TasksList: React.FC<Props> = ({ itemsPerPage }) => {
  const items = useSelector((state: RootState) => state.taskSlice.items);

  const [itemOffset, setItemOffset] = React.useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ul className="flex flex-col gap-2">
        {currentItems &&
          currentItems.map((item) => (
            <li key={item.id}>
              <TaskItem item={item} />
            </li>
          ))}
      </ul>
      <ReactPaginate
        className="flex items-center justify-center gap-2 mt-8 mb-4"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="inline-block"
        pageLinkClassName="py-2 px-4 text-sm font-medium text-[#37352f] bg-transparent border border-[#37352f] rounded-md cursor-pointer transition duration-200 ease-in-out hover:bg-[#37352f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#37352f] focus:ring-offset-2"
        previousClassName="inline-block"
        previousLinkClassName="py-2 px-4 text-sm font-medium text-[#37352f] bg-transparent border border-[#37352f] rounded-md cursor-pointer transition duration-200 ease-in-out hover:bg-[#37352f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#37352f] focus:ring-offset-2"
        nextClassName="inline-block"
        nextLinkClassName="py-2 px-4 text-sm font-medium text-[#37352f] bg-transparent border border-[#37352f] rounded-md cursor-pointer transition duration-200 ease-in-out hover:bg-[#37352f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#37352f] focus:ring-offset-2"
        activeLinkClassName="!bg-[#37352f] text-white"
        disabledClassName="text-gray-400 cursor-not-allowed border-gray-300"
        breakClassName="text-sm text-[#37352f]"
      />
    </>
  );
};
