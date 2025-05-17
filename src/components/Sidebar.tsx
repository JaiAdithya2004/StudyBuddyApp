
import { NavLink } from 'react-router-dom';
import { 
  BookText, 
  Calendar, 
  File, 
  FlaskConical, 
  Folders, 
  GraduationCap,
  Home, 
  Play,
  BookOpenCheck, 
  Star
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: GraduationCap, label: "Flashcards", path: "/flashcards" },
  { icon: FlaskConical, label: "Quiz", path: "/quiz" },
  { icon: Star, label: "Habit Tracker", path: "/habits" },
  { icon: Folders, label: "Courses", path: "/courses" },
  { icon: BookOpenCheck, label: "Reading Log", path: "/reading" },
  { icon: File, label: "Notes", path: "/notes" },
  { icon: Play, label: "Video Library", path: "/videos" },
  { icon: Calendar, label: "Lesson Planner", path: "/lessons" },
];

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  return (
    <aside 
      className={`${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 ease-in-out bg-neo-black border-r border-white/10 flex flex-col`}
    >
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        {!collapsed && (
          <span className="text-xl font-bold text-primary-gradient">
            NeoLearn
          </span>
        )}
        {collapsed && <span className="text-xl font-bold text-primary-gradient mx-auto">N</span>}
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md transition-all ${
                    isActive
                      ? "bg-white/10 text-neo-blue glow-border"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                <item.icon className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5`} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center">
          <div 
            className={`w-10 h-10 rounded-full bg-neo-purple text-white flex items-center justify-center ${
              collapsed ? "mx-auto" : "mr-3"
            }`}
          >
            N
          </div>
          {!collapsed && (
            <div>
              <p className="text-white font-medium">NeoLearner</p>
              <p className="text-white/50 text-sm">Student</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
