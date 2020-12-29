import cc from '../../modules/component.js'
import {$1} from '../../modules/getEl.js'


export default ({ name })=>{
  cc(name, {
    templates: [$1('#home')],
  })
}
