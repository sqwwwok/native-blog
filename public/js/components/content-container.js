import cc from '../modules/component.js'
import {$1} from '../modules/getEl.js'
import _ from '../modules/createEl.js'


export default function({ name, navgation, profile }) {
  const navTitles = Object.keys(navgation),
  contentAttrName = 'nav-to',
  contentEls = navTitles.map(title=>_(navgation[title]));
  console.log(contentEls)
  cc(name,{
    templates: [$1('#content-container')],
    slots: {
      'menu': navTitles.map(title=>
        _('span.menu-item',{[contentAttrName]: navgation[title]}, [title])
      ),
      'content': contentEls,
    },
    styles: ['../css/content-container.css'],
    expand({templates, slots}) {
      $1.call(templates[0],'img.profile').src=profile;
      const navItems = slots['menu'],
      contents = slots['content'],
      choosenClass = 'nav-choosen';
      navItems.map(nav=>{
        nav.addEventListener('click', ()=>{
          //TODO use 'choose' plugin
          const nextContentName = nav.getAttribute(contentAttrName);
          contents.map(content=>content.classList.remove(choosenClass));
          contents.find(content=>content.localName===nextContentName).classList.add(choosenClass);
          navItems.map(nav=>nav.classList.remove(choosenClass));
          nav.classList.add(choosenClass);
        })
      });
      let defaultContentName = navItems[0].getAttribute(contentAttrName);
      navItems[0].classList.add(choosenClass);
      contents.find(content=>content.localName===defaultContentName).classList.add(choosenClass);
    }
  })
}