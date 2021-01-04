/**
 * 
 * @param {Array<HTMLElement>} elements 
 * @param {{
 *    activeClassName:string,
 *    defaultElementIndex:number
 * }} initialOption 
 * @returns {(validate: (element: HTMLElement)=>boolean) => 
 *      (processor: {
  *      processElementChoosen: (elementChoosen: HTMLElement)=>void,
  *      processElementNotChoosen: (elementNotChoosen: HTMLElement)=>void
  *    })=>void
  * }
 */
function createChoice(elements, { activeClassName="choosen-elements", defaultElementIndex=0 }) {
  if(elements.length<1) throw Error('createChoice: length of elements is 0');
  elements[defaultElementIndex].classList.add(activeClassName);
  return function chooseElements (validate) {
    let elementsChoosen=[], elementsNotChoosen=[];
    elements.map(element=>{
      if(validate(element)){
        element.classList.add(activeClassName);
        elementsChoosen.push(element);
      }else{
        element.classList.remove(activeClassName);
        elementsNotChoosen.push(element);
      }
    });
    return function({processElementChoosen=()=>{}, processElementNotChoosen=()=>{}}) {
      elementsChoosen.map(processElementChoosen);
      elementsNotChoosen.map(processElementNotChoosen);
    };
  }
}

export default createChoice