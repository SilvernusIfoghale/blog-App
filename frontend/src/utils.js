export const apiUrl =
  import.meta.env.MODE == "development"
    ? "http://localhost:8000"
    : "https://blog-app-jenc.onrender.com";

export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
