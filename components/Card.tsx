interface ICard {
  children: React.ReactNode;
  className?: string;
}
const Card: React.FC<ICard> = ({ children, className }): JSX.Element => (
  <div
    className={`${className} relative flex flex-col bg-white rounded-lg shadow-lg`}
    style={style}
  >
    {children}
  </div>
);
const CardBody: React.FC<ICard> = ({ children }) => (
  <div className="flex-grow flex-shrink block p-5">{children}</div>
);
const CardTitle: React.FC<ICard> = ({ children, className }) => (
  <div className={`${className} font-medium text-gray-700 mb-3`}>
    {children}
  </div>
);
const CardText: React.FC<ICard> = ({ children }) => (
  <div className="text-gray-900 font-mono">{children}</div>
);
const style = {
  boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
};
const ArrowIcon = () => (
  <svg
    className="w-4 h-4 ml-2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

export { Card, CardBody, CardTitle, CardText, ArrowIcon };
