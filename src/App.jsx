import { useState } from "react";
import PropDrillingDemo from "./components/PropDrillingDemo";
import ContextDemo from "./components/ContextDemo";
import ReduxDemo from "./components/ReduxDemo";
import ComparisonDashboard from "./components/ComparisonDashboard";
import { Layers, Code, Settings, Cpu } from "lucide-react";

function App() {
	const [activeTab, setActiveTab] = useState("dashboard");

	return (
		<div className="app-container">
			{/* Header Panel */}
			<header className="app-header">
				<h1>React Data Sharing Demo</h1>
				<p>
					Compare the performance, architecture, and code style of Prop
					Drilling, React Context API, and Redux Toolkit in real-time.
				</p>
			</header>

			{/* Tab Navigation System */}
			<nav className="nav-tabs">
				<button
					className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}
					onClick={() => setActiveTab("dashboard")}>
					<Layers size={16} />
					Comparison Dashboard
				</button>
				<button
					className={`tab-button ${activeTab === "drilling" ? "active" : ""}`}
					onClick={() => setActiveTab("drilling")}>
					<Code size={16} />
					Prop Drilling
				</button>
				<button
					className={`tab-button ${activeTab === "context" ? "active" : ""}`}
					onClick={() => setActiveTab("context")}>
					<Settings size={16} />
					Context API
				</button>
				<button
					className={`tab-button ${activeTab === "redux" ? "active" : ""}`}
					onClick={() => setActiveTab("redux")}>
					<Cpu size={16} />
					Redux Toolkit
				</button>
			</nav>

			{/* Dynamic View Frame */}
			<main className="view-container card-glass">
				{activeTab === "dashboard" && <ComparisonDashboard />}
				{activeTab === "drilling" && <PropDrillingDemo />}
				{activeTab === "context" && <ContextDemo />}
				{activeTab === "redux" && <ReduxDemo />}
			</main>
		</div>
	);
}

export default App;
