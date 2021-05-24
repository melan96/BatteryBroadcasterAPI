import Cookies from "universal-cookie";

export function setLocalStorage(key, value) {
  try {
    const cookies = new Cookies();
    cookies.set(key, value, { path: "/" });
  } catch (error) {}
}

export function getLocalStorage(key) {
  try {
    const cookies = new Cookies();
    console.log("cookie return " + cookies.get(key));
    return cookies.get(key);
  } catch (e) {
    // if error, return initial value
  }
}
