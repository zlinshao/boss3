<template>
  <div v-show="show">
    <div class="loader">
      <div class="loader-inner pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: Boolean,
    },
  }
</script>
<style scoped="">
  .loader {
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 25%;
    max-width: 25%;
    height: 200px;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 43%;
    left: 50%;
    z-index: 999;
  }
  .pacman {
    position: relative;
  }
  .pacman > div:first-of-type {
    width: 0;
    height: 0;
    border-right: 25px solid transparent;
    border-top: 25px solid #6a8dfb;
    border-left: 25px solid #6a8dfb;
    border-bottom: 25px solid #6a8dfb;
    border-radius: 25px;
    -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
    animation: rotate_pacman_half_up 0.5s 0s infinite;
    position: relative;
    left: -30px;
  }
  @keyframes rotate_pacman_half_up {
    0% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    50% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    100% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }
  @keyframes rotate_pacman_half_down {
    0% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  @keyframes pacman-balls{
    75% {
      opacity: 0.7;
    }
    100% {
      -webkit-transform: translate(-100px, -6.25px);
      transform: translate(-100px, -6.25px);
    }
  }
  .pacman > div:nth-child(2) {
    width: 0;
    height: 0;
    border-right: 25px solid transparent;
    border-top: 25px solid #6a8dfb;
    border-left: 25px solid #6a8dfb;
    border-bottom: 25px solid #6a8dfb;
    border-radius: 25px;
    -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
    animation: rotate_pacman_half_down 0.5s 0s infinite;
    margin-top: -50px;
    position: relative;
    left: -30px;
  }
  .pacman > div:nth-child(3), .pacman > div:nth-child(4), .pacman > div:nth-child(5), .pacman > div:nth-child(6) {
    background-color: #6a8dfb;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    position: absolute;
    -webkit-transform: translate(0, -6.25px);
    -ms-transform: translate(0, -6.25px);
    transform: translate(0, -6.25px);
    top: 25px;
    left: 70px;
  }

  .pacman > div:nth-child(3) {
    -webkit-animation: pacman-balls 1s -0.66s infinite linear;
    animation: pacman-balls 1s -0.66s infinite linear;
  }
  .pacman > div:nth-child(4) {
    -webkit-animation: pacman-balls 1s -0.33s infinite linear;
    animation: pacman-balls 1s -0.33s infinite linear;
  }
  .pacman > div:nth-child(5) {
    -webkit-animation: pacman-balls 1s 0s infinite linear;
    animation: pacman-balls 1s 0s infinite linear;
  }
</style>
