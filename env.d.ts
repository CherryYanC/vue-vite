/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  
  import Vue from "vue";
  
  const component: DefineComponent<{}, {}, any> | Vue;
  
  export default component;
}

declare module 'axios'
declare module 'vue-router'
declare module 'element-plus'
