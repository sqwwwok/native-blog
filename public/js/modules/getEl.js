/**
 * 
 * @param {string} selector
 * @returns {NodeList} 
 */
function $(selector) {
  let rootElement =this || window.document;
  return rootElement.querySelectorAll(selector);
}

/**
 * return the first element selected
 * @param {string} selector
 * @returns {HTMLElement} 
 */
function $1(selector) {
  return $.call(this,selector)[0]
}

export {
  $ as default,
  $1
}
