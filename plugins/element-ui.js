import Vue from 'vue'
import {
  Message,
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

const components = [
  Message,
];

const Element = {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

Vue.use(Element, { locale })