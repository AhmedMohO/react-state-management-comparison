import { useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "../redux/store";
import {
	updateProfile,
	toggleTheme,
	incrementNotifications,
	decrementNotifications,
	clearNotifications,
} from "../redux/userSlice";
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
	const dispatch = useDispatch();
	// Subscribing to specific user state using useSelector
	// const user = useSelector((state) => state.user);

	// const [isEditing, setIsEditing] = useState(false);
	// const [editName, setEditName] = useState(user.name);
	// const [editEmail, setEditEmail] = useState(user.email);
	// const [editRole, setEditRole] = useState(user.role);

	const handleSave = (e) => {
		e.preventDefault();
		// dispatch(
		// 	updateProfile({ name: editName, email: editEmail, role: editRole }),
		// );
		// setIsEditing(false);
	};

	return (
		<RenderVisualizer
			name="DeepChild (Level 4) [Redux Subscriber]"
			highlightColor="var(--accent-red)">
			<div className="card-consumer">
				<h4 className="card-title">Interactive Control Center</h4>

				{/* User Card View */}
				{/* <div className="user-info-card">
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
					{/* {isEditing ? (
						<form onSubmit={handleSave} className="edit-form">
							<div className="input-group">
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
							</div>
						</form>
					) : ( */}
					<div className="control-buttons">
						{/* <button
							onClick={() => setIsEditing(true)}
							className="btn btn-primary">
							Edit Profile
						</button> */}
						<button
							onClick={() => dispatch(toggleTheme())}
							className="btn btn-secondary">
							{/* {user.theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}{" "} */}
							Toggle Theme
						</button>
						<div className="notification-controls">
							<span className="control-label">Notifications:</span>
							<button
								onClick={() => dispatch(incrementNotifications())}
								className="btn-icon">
								<Plus size={14} />
							</button>
							<button
								onClick={() => dispatch(decrementNotifications())}
								className="btn-icon">
								<Minus size={14} />
							</button>
							<button
								onClick={() => dispatch(clearNotifications())}
								className="btn-icon text-red">
								<RotateCcw size={14} />
							</button>
						</div>
					</div>
					{/* )} */}
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
// STORE SUBSCRIBER MONITOR NODE
// ==========================================
const ReduxTree = ({ children }) => {
	const user = useSelector((state) => state.user);
	return (
		<RenderVisualizer
			name="ReduxTree (Level 0) [Redux Subscriber]"
			highlightColor="var(--accent-purple)">
			<div className="state-owner-card">
				<div className="debug-state">
					<h5>Current Redux Store State:</h5>
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
export const ReduxDemo = () => {
	return (
		<Provider store={store}>
			<div className="demo-panel">
				<div className="demo-header-info">
					<span className="badge badge-redux">Redux Toolkit</span>
					<h2>Redux Toolkit Demonstration</h2>
					<p className="demo-description">
						In this setup, global state is housed in the Redux store. Components
						at any level can use <code>useSelector</code> to subscribe to
						specific segments of state, and <code>useDispatch</code> to trigger
						changes. Intermediate layers are completely bypassed.
						<strong>
							{" "}
							Redux uses fine-grained updates: only the components subscribing
							directly to the modified values will re-render!
						</strong>
					</p>
				</div>

				<div className="demo-tree">
					<ReduxTree>
						<Parent />
					</ReduxTree>
				</div>
			</div>
		</Provider>
	);
};

export default ReduxDemo;
