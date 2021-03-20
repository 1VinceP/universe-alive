export const getLocalItem = key => {
   if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
   }

   return null;
};

export const removeLocalItem = key => localStorage.removeItem(key);

export const setLocalItem = (key, item) => localStorage.setItem(key, JSON.stringify(item));

export const clearStorage = () => localStorage.clear();
