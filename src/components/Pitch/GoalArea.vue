<template>
  <div class="outer-rect top"></div>
  <div class="inner-rect top"></div>
  <div class="circle top"></div>
  <div class="outer-rect bottom"></div>
  <div class="inner-rect bottom"></div>
  <div class="circle bottom"></div>
  <div class="center"></div>

  <div class="corner corner-1"></div>
  <div class="corner corner-2"></div>
  <div class="corner corner-3"></div>
  <div class="corner corner-4"></div>
</template>

<script>
export default {};
</script>

<style>
.outer-rect,
.inner-rect {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 8rem;
  height: 3rem;
  border: solid 2px #1e1e1e;
  background-color: #369d36;
  z-index: 2;
}
.inner-rect {
  width: 4rem;
  height: 1rem;
}
.circle {
  width: 4rem;
  height: 4rem;
  border-radius: 100vw;
  border: solid 2px #1e1e1e;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.top {
  top: -1px;
}
.bottom {
  bottom: -1px !important;
}
.corner {
  width: 2rem;
  aspect-ratio: 1 / 1;
  border-radius: 100vw;
  border: solid 2px #1e1e1e;
  position: absolute;
}
.center {
  position: absolute;
  width: 5rem;
  aspect-ratio: 1 / 1;
  border-radius: 100vw;
  border: solid 2px #1e1e1e;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.corner-1 {
  top: -1rem;
  left: -1rem;
}
.corner-2 {
  top: -1rem;
  right: -1rem;
}
.corner-3 {
  bottom: -1rem;
  left: -1rem;
}
.corner-4 {
  bottom: -1rem;
  right: -1rem;
}
</style>
