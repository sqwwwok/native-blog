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
 *    observedProps: Array<string>,
 *    observer: (name:string, oldValue:string, newValue:string)=>void,
 *    slots: {[slotName:string]:Array<HTMLElement>}, 
 *    templates: Array<HTMLTemplateElement>, 
 *    expand: (clonedNodes :{
 *        templates:Array<HTMLElement>,
 *        slots:{[slotName:string]:Array<HTMLElement>}
 *    }) => void,
 *    styles: Array<string> 
 * }} option
 * @returns {Component}
 */
function createComponent(name, {
  observedProps=[],
  slots=[], 
  templates=[],
  styles=[],
  observer=()=>{}, 
  expand=()=>{} 
}) {
  let customComponent = class extends Component{
    static get observedAttributes() {
      return observedProps.slice();
    }
    
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

    attributeChangedCallback() {
      observer.apply(this, arguments);
    }

  }
  window.customElements.define(name, customComponent);
  return customComponent;
}


/**
 * 
 * @param {string} name 
 * @param {{
 *  roots:Array<HTMLElement>,
 *  props:Array<string>,
 * observer:(name:string, oldValue:string, newValue:string)=>void
 * }} option 
 * @returns {void}
 */
function createMiniComponent(name,{ roots=[], props=[], observer=()=>{} }) {
  let customComponent = class extends HTMLElement{
    static get observedAttributes() {
      return props.slice();
    }

    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      roots = roots.map(el=>el.cloneNode(true));
      this.shadowRoot.append(...roots);
    }

    attributeChangedCallback() {
      observer.apply(this, arguments);
    }
  }
  window.customElements.define(name, customComponent);
}

export {
  createComponent as default,
  createMiniComponent
}
