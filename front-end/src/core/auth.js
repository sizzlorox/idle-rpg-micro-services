import decode from 'jwt-decode';

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function removeCookie() {
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  window.location = "";
}

const isAuthorized = () => {
  const now = Date.now().valueOf() / 1000;
  const token = getCookie('token');
  if (!token) {
    return false;
  }

  const decoded = decode(token);
  console.log(decoded);
  if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
    console.log(`token expired: ${JSON.stringify(decoded)}`)
    return false;
  }
  if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
    console.log(`token not yet valid: ${JSON.stringify(decoded)}`)
    return false;
  }

  return true;
};

const deauthorize = () => {
  removeCookie();
};

export default {
  isAuthorized,
  deauthorize,
};
