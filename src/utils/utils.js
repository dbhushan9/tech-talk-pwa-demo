// Base64 to ArrayBuffer
export function bufferDecode(value) {
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}

// ArrayBuffer to URLBase64
export function bufferEncode(value) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(value)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export function isLoggedIn() {
  const loggedIn = sessionStorage.getItem("loggedIn") === "true";
  return loggedIn;
}

export function logout(){
sessionStorage.removeItem("loggedIn")
}


export function login(){
  sessionStorage.setItem("loggedIn","true")
  }