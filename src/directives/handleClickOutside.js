const clickOutsideEvent = (el, binding, event) => {
   if (!(el === event.target || el.contains(event.target))) {
      binding.value();
   }
};

export default {
   beforeMount(el, binding) {
      document.body.addEventListener('mousedown', e => clickOutsideEvent(el, binding, e));
   },
   unmounted(el, binding) {
      document.body.removeEventListener('mousedown', e => clickOutsideEvent(el, binding, e));
   },
};
