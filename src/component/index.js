import Component from "./Component";

const plugin = {
  install(Vue, options = {}) {
    const { name } = {
      name: "dragged",
      ...options
    };

    Vue.directive(name, Component);
  }
};

export default plugin;

if (typeof window !== `undefined` && window.Vue) {
  window.Vue.use(plugin);
}
