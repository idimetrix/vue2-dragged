import Vue from "vue";
import App from "./App.vue";

import Component from "./component";

Vue.use(Component);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
