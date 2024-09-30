import { Link, useNavigate } from "react-router-dom";

// LinkButton component that renders a button or a link based on the 'to' prop
function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  // Render a button that navigates back one page if 'to' is "-1"
  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  // Render a Link component for navigation to the specified 'to' path
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
