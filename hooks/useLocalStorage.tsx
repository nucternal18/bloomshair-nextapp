import React from "react";

const useLocalStorage = (storageKey: string, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) || fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

// evoke hook using the bellow code snippet:
// import useLocalStorage  from "./hooks/useLocalStorage";
// const [isOpen, setOpen] = useLocalStorage('is-open', false);

export default useLocalStorage;
