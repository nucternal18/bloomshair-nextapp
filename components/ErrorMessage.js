const ErrorMessage = ({ children, variant }) => {
  const color = {
    success: 'text-green-500 text-lg',
    danger: 'text-red-500 text-lg',
    default: 'text-yellow-500 text-xl',
  };
  return (
    <div className={`${color[variant]} py-2 font-semibold italic text-center`}>
      {children}
    </div>
  );
};

export default ErrorMessage;
