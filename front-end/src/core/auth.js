import decode from 'jwt-decode';

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

const isAuthorized = () => {
  const now = Date.now().valueOf() / 1000
  const decoded = decode(getCookie('token'));
  console.log(decoded);
  if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
    console.log(`token expired: ${JSON.stringify(decoded)}`)
    console.log('not authorized');
    return false;
  }
  if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
    console.log(`token not yet valid: ${JSON.stringify(decoded)}`)
    console.log('not authorized');
    return false;
  }

  console.log('authorized');
  return true;
};
export default isAuthorized;
