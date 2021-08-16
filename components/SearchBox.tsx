import { useState } from "react";
import { useRouter } from "next/router";
import Button from "./Button";

const SearchBox = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/products/search?keyword=${keyword}`);
    setKeyword("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-screen-lg">
      <div className="flex w-full ">
        <input
          type="text"
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          className="w-full p-2 border-2 border-collapse border-black border-opacity-50 rounded focus:outline-none"
        />
      </div>
      <Button type="submit" color="dark">
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
