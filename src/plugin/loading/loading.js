/**
 * Created by Administrator on 2018/4/4 0004.
 */
import LoadingComponent from './loading.vue'

let $vm;

export default {
  install(Vue, options) {
    if (!$vm) {
      const LoadingPlugin = Vue.extend(LoadingComponent);

      $vm = new LoadingPlugin({
        el: document.createElement('div')
      });

      document.body.appendChild($vm.$el);
    }

    $vm.show = false;

    let loading = {
      show() {
        $vm.show = true;
      },
      hide() {
        $vm.show = false;
      }
    };

    if (!Vue.$loading) {
      Vue.$loading = loading;
    }

    Vue.prototype.$loading = Vue.$loading;

    Vue.mixin({
      created() {
        this.$loading = Vue.$loading;
      }
    })
  }
}
