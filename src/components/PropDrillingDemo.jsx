import { useState } from "react";
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
const DeepChild = ({
	user,
	updateProfile,
	toggleTheme,
	incrementNotifications,
	decrementNotifications,
	clearNotifications,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(user.name);
	const [editEmail, setEditEmail] = useState(user.email);
	const [editRole, setEditRole] = useState(user.role);

	const handleSave = (e) => {
		e.preventDefault();
		updateProfile(editName, editEmail, editRole);
		setIsEditing(false);
	};

	return (
		<RenderVisualizer
			name="DeepChild (Level 4) [Consumer]"
			highlightColor="var(--accent-red)">
			<div className="card-consumer">
				<h4 className="card-title">Interactive Control Center</h4>

				{/* User Card View */}
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
				</div>

				{/* Action Controls */}
				<div className="action-controls">
					{isEditing ? (
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
					) : (
						<div className="control-buttons">
							<button
								onClick={() => setIsEditing(true)}
								className="btn btn-primary">
								Edit Profile
							</button>
							<button onClick={toggleTheme} className="btn btn-secondary">
								{user.theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}{" "}
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
// LEVEL 3: GRANDCHILD (PASSTHROUGH)
// ==========================================
const Grandchild = ({
	user,
	updateProfile,
	toggleTheme,
	incrementNotifications,
	decrementNotifications,
	clearNotifications,
}) => {
	return (
		<RenderVisualizer
			name="Grandchild (Level 3) [Passthrough]"
			highlightColor="var(--accent-amber)">
			<div className="passthrough-card">
				<p className="passthrough-text">I am just forwarding props...</p>
				<DeepChild
					user={user}
					updateProfile={updateProfile}
					toggleTheme={toggleTheme}
					incrementNotifications={incrementNotifications}
					decrementNotifications={decrementNotifications}
					clearNotifications={clearNotifications}
				/>
			</div>
		</RenderVisualizer>
	);
};

// ==========================================
// LEVEL 2: CHILD (PASSTHROUGH)
// ==========================================
const Child = ({
	user,
	updateProfile,
	toggleTheme,
	incrementNotifications,
	decrementNotifications,
	clearNotifications,
}) => {
	return (
		<RenderVisualizer
			name="Child (Level 2) [Passthrough]"
			highlightColor="var(--accent-teal)">
			<div className="passthrough-card">
				<p className="passthrough-text">I am just forwarding props...</p>
				<Grandchild
					user={user}
					updateProfile={updateProfile}
					toggleTheme={toggleTheme}
					incrementNotifications={incrementNotifications}
					decrementNotifications={decrementNotifications}
					clearNotifications={clearNotifications}
				/>
			</div>
		</RenderVisualizer>
	);
};

// ==========================================
// LEVEL 1: PARENT (PASSTHROUGH)
// ==========================================
const Parent = ({
	user,
	updateProfile,
	toggleTheme,
	incrementNotifications,
	decrementNotifications,
	clearNotifications,
}) => {
	return (
		<RenderVisualizer
			name="Parent (Level 1) [Passthrough]"
			highlightColor="var(--accent-blue)">
			<div className="passthrough-card">
				<p className="passthrough-text">I am just forwarding props...</p>
				<Child
					user={user}
					updateProfile={updateProfile}
					toggleTheme={toggleTheme}
					incrementNotifications={incrementNotifications}
					decrementNotifications={decrementNotifications}
					clearNotifications={clearNotifications}
				/>
			</div>
		</RenderVisualizer>
	);
};

// ==========================================
// ROOT DEMO COMPONENT (STATE OWNER)
// ==========================================
export const PropDrillingDemo = () => {
	// State is defined here
	const [user, setUser] = useState({
		name: "Sarah Connor",
		email: "sarah.connor@sky-net.io",
		role: "Resistance Commander",
		theme: "dark",
		notifications: 5,
	});

	const updateProfile = (name, email, role) => {
		setUser((prev) => ({
			...prev,
			...(name !== undefined && { name }),
			...(email !== undefined && { email }),
			...(role !== undefined && { role }),
		}));
	};

	const toggleTheme = () => {
		setUser((prev) => ({
			...prev,
			theme: prev.theme === "dark" ? "light" : "dark",
		}));
	};

	const incrementNotifications = () => {
		setUser((prev) => ({
			...prev,
			notifications: prev.notifications + 1,
		}));
	};

	const decrementNotifications = () => {
		setUser((prev) => ({
			...prev,
			notifications: Math.max(0, prev.notifications - 1),
		}));
	};

	const clearNotifications = () => {
		setUser((prev) => ({
			...prev,
			notifications: 0,
		}));
	};

	return (
		<div className="demo-panel">
			<div className="demo-header-info">
				<span className="badge badge-drilling">
					Traditional Props (Prop Drilling)
				</span>
				<h2>Prop Drilling Demonstration</h2>
				<p className="demo-description">
					In this configuration, state is held at the Root component and passed
					down explicitly as props to the Parent, Child, and Grandchild. These
					intermediate components do not use this data; they only exist to pass
					it down.
					<strong>
						{" "}
						Note that modifying any user details will cause ALL components in
						this tree to re-render.
					</strong>
				</p>
			</div>

			<div className="demo-tree">
				<RenderVisualizer
					name="PropDrillingDemo (Level 0) [State Owner]"
					highlightColor="var(--accent-purple)">
					<div className="state-owner-card">
						<div className="debug-state">
							<h5>Current State (Root Local State):</h5>
							<pre>{JSON.stringify(user, null, 2)}</pre>
						</div>

						<Parent
							user={user}
							updateProfile={updateProfile}
							toggleTheme={toggleTheme}
							incrementNotifications={incrementNotifications}
							decrementNotifications={decrementNotifications}
							clearNotifications={clearNotifications}
						/>
					</div>
				</RenderVisualizer>
			</div>
		</div>
	);
};

export default PropDrillingDemo;
