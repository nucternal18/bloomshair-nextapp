const Spinner = ({ className }) => (
  <div className="flex items-center justify-center ">
    <div
      className={`${className} border-t-2 border-b-2 border-purple-500 rounded-full animate-spin${className} `}
    ></div>
  </div>
);

export default Spinner;
