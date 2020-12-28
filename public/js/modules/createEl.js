/** create html element with creator [tagname]#[id].[class]
 * @param {string} creator
 * @param {Array<HTMLElement|string>} children
 * @param {Object} props
 * @returns {HTMLElement} 
 */
function _(creator, props={}, children=[]) {
  let tagMatch = creator.match(/^\w+/);
  let el = tagMatch ? document.createElement(tagMatch[0]) : document.createElement('div');
  el.append(...children);
  Object.keys(props).map(key=>el.setAttribute(key, props[key]));
  return addId(el, creator.replace(/^\w+/,''));
}

/**
 * creator without tagname
 * @param {HTMLElement} el
 * @param {string} creator
 * @returns {HTMLElement} 
 */
function addId(el, creator) {
  let idMatchArray = creator.match(/\#[^\.^\#]+/g);
  if(idMatchArray) idMatchArray.map(idMatcher => el.setAttribute('id', idMatcher.slice(1)));
  return addClass(el, creator.replace(/\#[^\.^\#]+/g,''));
}

/**
 * creator without tagname and id
 * @param {HTMLElement} el
 * @param {string} creator
 * @returns {HTMLElement} 
 */
function addClass(el, creator) {
  if(!creator) return el;
  el.classList.add(...creator.split('.').slice(1));
  return el;
}

/**
 * create external styles 
 * @param {string} href 
 */
function createStyle(href) {
  return _('link',{
    rel: 'stylesheet',
    href: href
  })
}

export {
  _ as default,
  createStyle
}