export const addItem = (key, item) => {
	localStorage.setItem(key, JSON.stringify(item));
};

export const removeItem = (key) => {
	localStorage.removeItem(key);
};

export const getItem = (key) => {
	return JSON.parse(localStorage.getItem(key));
};
