import cc from '../../modules/component.js'
import {$1} from '../../modules/getEl.js'


export default ({ name })=>{
  cc("overview-blog", {
    templates: [$1("#overview-of-blog")],
    slots: {
      "title": [],
      "date": [],
      "abstract": []
    },
    expand({slots}) {

    }
  })
  cc(name, {
    templates: [$1('#blogs')],
    slots: {
      "tag": []
    }
  })
}
