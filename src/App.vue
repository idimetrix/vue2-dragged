<template>
  <div id="app">
    <img class="image" :src="image" v-dragged="onDragged" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      image: "https://picsum.photos/id/237/300"
    };
  },
  methods: {
    onDragged({ el, deltaX, deltaY }) {
      const { left, top } = window.getComputedStyle(el);

      el.style.left = parseFloat(left) + deltaX + "px";
      el.style.top = parseFloat(top) + deltaY + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  .image {
    position: absolute;
  }
}
</style>
