import $ from './getEl.js'
import _, {createStyle} from './createEl.js'

class Component extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }


  /**
   * @param {HTMLElement} slotElement 
   * @returns {Component}
   */
  addSlot(slotElement) {
    this.appendChild(slotElement);
    return this;
  }

  
  /**
   * @param {HTMLElement} clonedTemplate
   * @returns {Component} 
   */
  addTemplate(clonedTemplate) {
    this.shadowRoot.append(clonedTemplate);
    return this;
  }

  
  /**
   * @param  {HTMLStyleElement} style 
   * @returns {Component}
   */
  addStyle(style) {
    this.shadowRoot.append(style);
    this.append(style.cloneNode(true));
    return this;
  }

}


/** create and register component 
 * @param {string} name name must be kebal-case
 * @param {{
 *    slots: {[slotName:string]:Array<HTMLElement>}, 
 *    templates: Array<HTMLTemplateElement>, 
 *    expand: (param :{
 *        component: Component, 
 *        templates:Array<HTMLElement>,
 *        slots:{[slotName:string]:Array<HTMLElement>}
 *    }) => void,
 *    styles: Array<string> 
 * }} param1
 * @returns {Component}
 */
function createComponent(name, {slots, templates, expand, styles}) {
  let customComponent = class extends Component{
    constructor() {
      super();

      // clone slots and templates
      let clonedSlots = {};
      for(let slotName in slots){
        clonedSlots[slotName] = slots[slotName].map(slot=>{
          slot.setAttribute('slot', slotName);
          return slot.cloneNode(true);
        });
      }
      let clonedTemplates = templates.map(t=>t.content.cloneNode(true));

      // hook
      expand({
        component:this, 
        templates:clonedTemplates,
        slots: clonedSlots
      });

      // add cloned slots, styles and templates      
      for(let slotName in slots){
        clonedSlots[slotName].map(this.addSlot.bind(this));
      }
      clonedTemplates.map(this.addTemplate.bind(this));

      styles.map(href=>{
        this.addStyle(createStyle(href));
      });
    }
  }
  window.customElements.define(name, customComponent);
  return customComponent;
}

export default createComponent;
