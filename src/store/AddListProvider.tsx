"use client";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";

type AddListContextType = {
  showAddList: boolean;
  openAddListModal: () => void;
  closeAddListModal: () => void;
};

const AddListContext = createContext<AddListContextType | null>(null);

export function AddListProvider({ children }: PropsWithChildren) {
  const [showAddList, setShowAddList] = useState(false);

  //   function for opening and closing modal
  //   since it will be used in more than one component
  const openAddListModal = () => setShowAddList(true);
  const closeAddListModal = () => setShowAddList(false);

  return (
    <AddListContext.Provider
      value={{
        showAddList,
        openAddListModal,
        closeAddListModal,
      }}>
      {children}
    </AddListContext.Provider>
  );
}

// Custom hook to consume the context
export const useTask = () => {
  const context = useContext(AddListContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
