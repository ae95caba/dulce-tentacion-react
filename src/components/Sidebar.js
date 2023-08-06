import { Link, NavLink, useLocation } from "react-router-dom";
import Tabs from "./Tabs";

export default function Sidebar({ tabs }) {
  return (
    <aside className="sidebar">
      <Tabs />
    </aside>
  );
}
