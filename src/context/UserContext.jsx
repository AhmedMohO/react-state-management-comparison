import { createContext, useContext, useState, useCallback } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		name: "Sarah Connor",
		email: "sarah.connor@sky-net.io",
		role: "Resistance Commander",
		theme: "dark",
		notifications: 5,
	});

	const updateProfile = useCallback((name, email, role) => {
		setUser((prev) => ({
			...prev,
			...(name !== undefined && { name }),
			...(email !== undefined && { email }),
			...(role !== undefined && { role }),
		}));
	}, []);

	const toggleTheme = useCallback(() => {
		setUser((prev) => ({
			...prev,
			theme: prev.theme === "dark" ? "light" : "dark",
		}));
	}, []);

	const incrementNotifications = useCallback(() => {
		setUser((prev) => ({
			...prev,
			notifications: prev.notifications + 1,
		}));
	}, []);

	const decrementNotifications = useCallback(() => {
		setUser((prev) => ({
			...prev,
			notifications: Math.max(0, prev.notifications - 1),
		}));
	}, []);

	const clearNotifications = useCallback(() => {
		setUser((prev) => ({
			...prev,
			notifications: 0,
		}));
	}, []);

	const value = {
		user,
		updateProfile,
		toggleTheme,
		incrementNotifications,
		decrementNotifications,
		clearNotifications,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};
