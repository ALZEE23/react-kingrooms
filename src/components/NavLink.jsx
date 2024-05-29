import { Link } from "react-router-dom";

export default function NavLink({ href, children }) {
  return (
    <Link
      className="inline-flex sm:px-4 sm:py-2 sm:text-slate-900 hover:text-white"
      to={href}
    >
      {children}
    </Link>
  );
}
