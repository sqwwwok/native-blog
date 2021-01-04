import cc from '../modules/component.js'
import {$1} from '../modules/getEl.js'
import _ from '../modules/createEl.js'
import createChoice from '../modules/choose.js'


export default function({ name, navgation, profile }) {
  const navTitles = Object.keys(navgation),
  contentAttrName = 'nav-to',
  contentEls = navTitles.map(title=>_(navgation[title]+'.content'));
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
      const defaultIndex = 1;
      const navItems = slots['menu'],
      contents = slots['content'],
      chooseNav = createChoice(navItems, {
        activeClassName: 'nav-choosen', 
        defaultElementIndex:defaultIndex
      }),
      chooseContent = createChoice(contents, {
        activeClassName:'content-choosen', 
        defaultElementIndex:defaultIndex
      });
      navItems.map(nav=>{
        nav.addEventListener('click', ()=>{
          const nextContentName = nav.getAttribute(contentAttrName);
          chooseContent(content=>content.localName===nextContentName);
          chooseNav(navItem=>navItem===nav);
        })
      });
    }
  })
}