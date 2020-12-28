import cc from '../modules/component.js'
import {$1} from '../modules/getEl.js'
import _ from '../modules/createEl.js'


export default function({ navgation, profile }) {
  let navTitles = Object.keys(navgation);
  let defaultTitle = navTitles[0];
  cc('content-container',{
    templates: [$1('#content-container')],
    slots: {
      'menu': navTitles.map(title=>
        _('span.menu-item',{href: navgation[title]}, [title])
      ),
      'profile': [_('img', {src: profile})],
      'content': [_('iframe', {src: navgation[defaultTitle]})]
    },
    styles: ['../css/content-container.css'],
    expand({templates, slots}) {
      slots['menu'][0].classList.add('nav-choosen');
      $1.call(templates[0],'img.profile').src=profile;
      slots['menu'].map(slot=>{
        let iframeHref = slot.getAttribute('href');
        slot.addEventListener('click', (e)=>{
          slots['content'][0].setAttribute('src', iframeHref);
          slots['menu'].map(slot=>slot.classList.remove('nav-choosen'));
          slot.classList.add('nav-choosen');
        })
      })
    }
  })
}