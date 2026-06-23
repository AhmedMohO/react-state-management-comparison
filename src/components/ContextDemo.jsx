import { useState } from "react";
import { useUserContext, UserProvider } from "../context/UserContext";
import RenderVisualizer from "./RenderVisualizer";
import {
	User,
	Mail,
	Shield,
	Sun,
	Moon,
	Bell,
	Plus,
	Minus,
	RotateCcw,
} from "lucide-react";

// ==========================================
// LEVEL 4: DEEP CHILD (CONSUMER/MUTATOR)
// ==========================================
const DeepChild = () => {
	// Consuming context directly
	const {
		// user,
		updateProfile,
		toggleTheme,
		incrementNotifications,
		decrementNotifications,
		clearNotifications,
	} = useUserContext();

	const [isEditing, setIsEditing] = useState(false);
	// const [editName, setEditName] = useState(user.name);
	// const [editEmail, setEditEmail] = useState(user.email);
	// const [editRole, setEditRole] = useState(user.role);

	const handleSave = (e) => {
		e.preventDefault();
		// updateProfile(editName, editEmail, editRole);
		setIsEditing(false);
	};

	return (
		<RenderVisualizer
			name="DeepChild (Level 4) [Context Consumer]"
			highlightColor="var(--accent-red)">
			<div className="card-consumer">
				<h4 className="card-title">Interactive Control Center</h4>

				{/* User Card View
				<div className="user-info-card">
					<div className="user-info-item">
						<User size={16} className="icon" />
						<span className="info-label">Name:</span>
						<span className="info-value">{user.name}</span>
					</div>
					<div className="user-info-item">
						<Mail size={16} className="icon" />
						<span className="info-label">Email:</span>
						<span className="info-value">{user.email}</span>
					</div>
					<div className="user-info-item">
						<Shield size={16} className="icon" />
						<span className="info-label">Role:</span>
						<span className="info-value">{user.role}</span>
					</div>
					<div className="user-info-item">
						{user.theme === "dark" ? (
							<Moon size={16} className="icon" />
						) : (
							<Sun size={16} className="icon" />
						)}
						<span className="info-label">Theme:</span>
						<span className="badge-theme">{user.theme}</span>
					</div>
					<div className="user-info-item">
						<Bell size={16} className="icon" />
						<span className="info-label">Notifications:</span>
						<span className="badge-count">{user.notifications}</span>
					</div>
				</div> */}

				{/* Action Controls */}
				<div className="action-controls">
					{isEditing ? (
						<form onSubmit={handleSave} className="edit-form">
							{/* <div className="input-group">
								<label>Name</label>
								<input
									type="text"
									value={editName}
									onChange={(e) => setEditName(e.target.value)}
									className="form-input"
									required
								/>
							</div>
							<div className="input-group">
								<label>Email</label>
								<input
									type="email"
									value={editEmail}
									onChange={(e) => setEditEmail(e.target.value)}
									className="form-input"
									required
								/>
							</div>
							<div className="input-group">
								<label>Role</label>
								<input
									type="text"
									value={editRole}
									onChange={(e) => setEditRole(e.target.value)}
									className="form-input"
									required
								/>
							</div>
							<div className="form-actions">
								<button type="submit" className="btn btn-save">
									Save Profile
								</button>
								<button
									type="button"
									onClick={() => setIsEditing(false)}
									className="btn btn-cancel">
									Cancel
								</button>
							</div> */}
						</form>
					) : (
						<div className="control-buttons">
							<button
								onClick={() => setIsEditing(true)}
								className="btn btn-primary">
								Edit Profile
							</button>
							<button onClick={toggleTheme} className="btn btn-secondary">
								{/* {user.theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}{" "} */}
								Toggle Theme
							</button>
							<div className="notification-controls">
								<span className="control-label">Notifications:</span>
								<button onClick={incrementNotifications} className="btn-icon">
									<Plus size={14} />
								</button>
								<button onClick={decrementNotifications} className="btn-icon">
									<Minus size={14} />
								</button>
								<button
									onClick={clearNotifications}
									className="btn-icon text-red">
									<RotateCcw size={14} />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</RenderVisualizer>
	);
};

// ==========================================
// LEVEL 3: GRANDCHILD (NO PROPS)
// ==========================================
const Grandchild = () => {
	return (
		<RenderVisualizer
			name="Grandchild (Level 3) [Bypassed]"
			highlightColor="var(--accent-amber)">
			<div className="passthrough-card bypassed">
				<p className="passthrough-text text-green">
					✓ Clean bypass! No props received.
				</p>
				<DeepChild />
			</div>
		</RenderVisualizer>
	);
};

// ==========================================
// LEVEL 2: CHILD (NO PROPS)
// ==========================================
const Child = () => {
	return (
		<RenderVisualizer
			name="Child (Level 2) [Bypassed]"
			highlightColor="var(--accent-teal)">
			<div className="passthrough-card bypassed">
				<p className="passthrough-text text-green">
					✓ Clean bypass! No props received.
				</p>
				<Grandchild />
			</div>
		</RenderVisualizer>
	);
};

// ==========================================
// LEVEL 1: PARENT (NO PROPS)
// ==========================================
const Parent = () => {
	return (
		<RenderVisualizer
			name="Parent (Level 1) [Bypassed]"
			highlightColor="var(--accent-blue)">
			<div className="passthrough-card bypassed">
				<p className="passthrough-text text-green">
					✓ Clean bypass! No props received.
				</p>
				<Child />
			</div>
		</RenderVisualizer>
	);
};

// ==========================================
// WRAPPER TO TRACK PROVIDER RENDER
// ==========================================
const ContextTree = ({ children }) => {
	const { user } = useUserContext();
	return (
		<RenderVisualizer
			name="ContextDemo (Level 0) [Provider Node]"
			highlightColor="var(--accent-purple)">
			<div className="state-owner-card">
				<div className="debug-state">
					<h5>Current Context State:</h5>
					<pre>{JSON.stringify(user, null, 2)}</pre>
				</div>
				{children}
			</div>
		</RenderVisualizer>
	);
};

// ==========================================
// ROOT DEMO COMPONENT
// ==========================================
export const ContextDemo = () => {
	return (
		<UserProvider>
			<div className="demo-panel">
				<div className="demo-header-info">
					<span className="badge badge-context">React Context API</span>
					<h2>Context API Demonstration</h2>
					<p className="demo-description">
						Here, data is supplied via a <code>UserContext.Provider</code>{" "}
						wrapping the tree. Intermediate levels (Parent, Child, Grandchild)
						do not receive or pass down any props. Because we use the standard
						Provider-children pattern and intermediate components don't consume
						the context,
						<strong>
							{" "}
							intermediate components do NOT re-render when Context values
							change!
						</strong>{" "}
						Only the Provider and the DeepChild consumer re-render.
					</p>
				</div>
				{/* NOTE: Ask AI for guidance if you don't know how to implement experiment card */}
				<div className="experiment-card">
					<div className="experiment-card-glow" />

					<h4 className="experiment-card-title">
						🧪 Live Experiment: Children vs Direct Nesting
					</h4>

					<p className="experiment-card-description">
						Want to see how React's composition pattern saves performance? Open{" "}
						<code>src/components/ContextDemo.jsx</code> and look at lines{" "}
						<strong>293-295</strong>:
					</p>

					<div className="experiment-card-code">
						<span className="exp-code-comment">
							// Current Pattern (Composition):
						</span>
						<br />
						&lt;<span className="exp-code-purple">ContextTree</span>&gt;
						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&lt;
						<span className="exp-code-blue">Parent</span> /&gt;
						<br />
						&lt;/<span className="exp-code-purple">ContextTree</span>&gt;
						<br />
						<br />
						<span className="exp-code-comment">
							// Try changing to direct nesting:
						</span>
						<br />
						<span className="exp-code-teal">
							1. In ContextTree component (lines 217-232), replace{" "}
							{"{children}"} with &lt;Parent /&gt;
						</span>
						<br />
						<span className="exp-code-teal">
							2. In ContextDemo (lines 347-349), change it to simply
							&lt;ContextTree /&gt;
						</span>
					</div>

					<p className="experiment-card-note">
						<span>💡</span> <strong>Observe:</strong> Once changed, watch the
						render counters for <em>Parent</em>, <em>Child</em>, and{" "}
						<em>Grandchild</em> flash on every toggle. Currently, they don't
						re-render at all!
					</p>
				</div>

				<div className="demo-tree">
					<ContextTree>
						<Parent />
					</ContextTree>
				</div>
			</div>
		</UserProvider>
	);
};

export default ContextDemo;
