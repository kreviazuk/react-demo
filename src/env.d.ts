/// <reference types="vite/client" />
/// <reference types="@dcloudio/types" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'wd-button': typeof import('wot-design-uni')['Button']
    'wd-input': typeof import('wot-design-uni')['Input']
    'wd-form': typeof import('wot-design-uni')['Form']
    'wd-form-item': typeof import('wot-design-uni')['FormItem']
    'wd-radio': typeof import('wot-design-uni')['Radio']
    'wd-radio-group': typeof import('wot-design-uni')['RadioGroup']
    'wd-datetime-picker': typeof import('wot-design-uni')['DatetimePicker']
    'wd-grid': typeof import('wot-design-uni')['Grid']
    'wd-grid-item': typeof import('wot-design-uni')['GridItem']
    'wd-icon': typeof import('wot-design-uni')['Icon']
    'wd-tag': typeof import('wot-design-uni')['Tag']
    'wd-rate': typeof import('wot-design-uni')['Rate']
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $uni: Uni
  }
}

export {}
