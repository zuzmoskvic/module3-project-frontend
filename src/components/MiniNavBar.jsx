import { useLocation } from "react-router-dom";

const steps = [
  { name: "Upload record", path: "/addRecord" },
  { name: "Transcribe", path: "/transcribe" },
  { name: "Write", path: "/write" },
  { name: "Read", path: "/display" },
];

function MiniNavBar({ children }) {
  const location = useLocation();
  const step = location.pathname;

  const getStepClass = (stepIndex) => {
    const currentIndex = steps.findIndex((s) => step.includes(s.path));

    return currentIndex >= stepIndex ? "completed-step" : "incompleted-step";
  };

  return (
    <div>
      <nav className="mini-nav">
        <ul className="mini-nav-links">
          <li className={"completed-step"}>1. Record ⎯ </li>
          <li className={getStepClass(1)}>&nbsp;2. Transcribe ⎯ </li>
          <li className={getStepClass(2)}>&nbsp;3. Write ⎯ </li>
          <li className={getStepClass(3)}>&nbsp;4. Read</li>
        </ul>
      </nav>
      {children}
    </div>
  );
}

export default MiniNavBar;
