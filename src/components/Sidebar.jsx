import { useState } from "react";
import { MdChecklist, MdDoneAll, MdPendingActions, MdAssessment } from "react-icons/md";

export default function Sidebar({
  open,
  setOpen,
  activePage,
  setActivePage,
  activeDeferralTab,
  setActiveDeferralTab,
}) {
  const [deferralOpen, setDeferralOpen] = useState(false); // ⭐ NEW

  const menuItems = [
    { label: "My Queue", icon: <MdChecklist /> },
    { label: "Complete DCLs", icon: <MdDoneAll /> },
    {
      label: "Deferrals",
      icon: <MdPendingActions />,
      subTabs: ["Pending Approval", "Create Deferral"],
    },
    { label: "Reports", icon: <MdAssessment /> },
  ];

  const handleMenuClick = (item) => {
    setActivePage(item.label);

    // ⭐ DEFERRAL TOGGLE LOGIC
    if (item.label === "Deferrals") {
      setDeferralOpen((prev) => !prev); // toggle open/close
    } else {
      setDeferralOpen(false); // close submenu when leaving Deferrals
    }
  };

  return (
    <div
      className={`bg-indigo-900 text-white h-screen transition-all duration-300
        ${open ? "w-64" : "w-20"} flex-shrink-0 flex flex-col`}
    >
      {open && <h1 className="font-bold text-2xl px-4 mb-6">RM Dashboard</h1>}

      <ul className="space-y-2 mt-4 flex-1">
        {menuItems.map((item) => (
          <li key={item.label}>
            <div
              onClick={() => handleMenuClick(item)}
              className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-r-full
                transition-colors duration-200
                ${activePage === item.label ? "bg-indigo-700 shadow-inner" : "hover:bg-indigo-700"}`}
            >
              <span className="text-xl">{item.icon}</span>
              {open && <span className="font-medium">{item.label}</span>}
            </div>

            {/* ⭐ UPDATED SUBMENU: Only shows when BOTH sidebar is open AND deferralOpen is true */}
            {item.subTabs && open && item.label === "Deferrals" && deferralOpen && (
              <ul className="ml-10 mt-1 space-y-1">
                {item.subTabs.map((tab) => (
                  <li
                    key={tab}
                    onClick={() => setActiveDeferralTab(tab)}
                    className={`cursor-pointer px-3 py-1 rounded-r-full transition-colors duration-200
                      ${activeDeferralTab === tab ? "bg-indigo-600 font-semibold" : "hover:bg-indigo-700"}`}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setOpen(!open)}
        className="bg-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-600 transition m-4"
      >
        {open ? "Collapse" : "Expand"}
      </button>
    </div>
  );
}
