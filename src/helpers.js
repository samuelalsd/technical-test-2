/**
 * Return a cookie value
 * @param string a the cookie name
 * @return mixed the cookie value or false if doesn't exist
 */
export const readCookie = a => {
  var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : false;
};

/**
 * Set a cookie
 * @param string cname the cookie name
 * @param mixed cvalue the cookie value
 * @param integer exdays the number of days after which it is expired
 */
export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

/**
 * Delay the execution of a function
 * @param callable fn containing the function we want to delay
 * @param integer ms containing the number of milliseconds by which we want to delay
 */
export const delay = (fn, ms) => {
  let timer = 0;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args), ms || 0);
  };
};

/**
 * Convert a number into a humanized string
 * @param integer number containing the number we want to humanize
 * @return string containing the humanized number
 */
export const humanizeNumber = number => {
  let numberString = [];
  let suffix = "";

  if (number > 1000000000) {
    numberString.push(
      Math.round((number / 1000000000 + Number.EPSILON) * 100) / 100
    );
    suffix = "B";
  } else if (number > 1000000) {
    numberString.push(
      Math.round((number / 1000000 + Number.EPSILON) * 100) / 100
    );
    suffix = "M";
  } else if (number > 1000) {
    numberString.push(Math.round(number / 1000));
    suffix = "k";
  } else {
    numberString.push(number.toLocaleString());
  }

  return numberString.join("") + suffix;
};

/**
 * Toggle between yes and no
 * @param string currentValue containing the current value
 */
export const yesNoToggler = currentValue => {
  if (!currentValue) return "yes";
  let toggle = {
    yes: "no",
    no: "yes"
  };
  return toggle[currentValue];
};
