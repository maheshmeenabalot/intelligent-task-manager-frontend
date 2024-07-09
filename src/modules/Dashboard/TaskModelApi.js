export const fetchWithRetry = async (url, options) => {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    return await res.json();
};
  
export const searchUsersByName = async (name) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/search?name=${name}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
  
    return fetchWithRetry(url, options);
};
  
export const fetchCollaboratorDetails = async (id) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${id}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
  
    return fetchWithRetry(url, options);
};
