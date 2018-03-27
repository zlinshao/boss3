<template>
  <div>
    <!--<div class="page">-->
    <!--<div class="circle-loader">-->
    <!--<div class="circle-line">-->
    <!--<div class="circle circle-blue"></div>-->
    <!--<div class="circle circle-blue"></div>-->
    <!--<div class="circle circle-blue"></div>-->
    <!--</div>-->
    <!--<div class="circle-line">-->
    <!--<div class="circle circle-yellow"></div>-->
    <!--<div class="circle circle-yellow"></div>-->
    <!--<div class="circle circle-yellow"></div>-->
    <!--</div>-->
    <!--<div class="circle-line">-->
    <!--<div class="circle circle-red"></div>-->
    <!--<div class="circle circle-red"></div>-->
    <!--<div class="circle circle-red"></div>-->
    <!--</div>-->
    <!--<div class="circle-line">-->
    <!--<div class="circle circle-green"></div>-->
    <!--<div class="circle circle-green"></div>-->
    <!--<div class="circle circle-green"></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <div style="position: fixed;top: 50%;left: 50%;transform:translate(-50%,-50%);z-index: 999;display: block;">
      <img src="../../assets/images/loading.gif" alt="" >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  /*@-webkit-keyframes rotate-animation {*/
  /*0% {*/
  /*-webkit-transform: rotate(0deg);*/
  /*transform: rotate(0deg);*/
  /*}*/
  /*100% {*/
  /*-webkit-transform: rotate(360deg);*/
  /*transform: rotate(360deg);*/
  /*}*/
  /*}*/
  /*@keyframes rotate-animation {*/
  /*0% {*/
  /*-webkit-transform: rotate(0deg);*/
  /*transform: rotate(0deg);*/
  /*}*/
  /*100% {*/
  /*-webkit-transform: rotate(360deg);*/
  /*transform: rotate(360deg);*/
  /*}*/
  /*}*/
  /*@-webkit-keyframes move-animation {*/
  /*0% {*/
  /*-webkit-transform: translate(0, 0);*/
  /*transform: translate(0, 0);*/
  /*}*/
  /*25% {*/
  /*-webkit-transform: translate(-64px, 0);*/
  /*transform: translate(-64px, 0);*/
  /*}*/
  /*75% {*/
  /*-webkit-transform: translate(32px, 0);*/
  /*transform: translate(32px, 0);*/
  /*}*/
  /*100% {*/
  /*-webkit-transform: translate(0, 0);*/
  /*transform: translate(0, 0);*/
  /*}*/
  /*}*/
  /*@-webkit-keyframes move-animation {*/
  /*0%{*/
  /*-webkit-transform: translate(0,0);*/
  /*}*/
  /*}*/
  /*@keyframes move-animation {*/
  /*0% {*/
  /*-webkit-transform: translate(0, 0);*/
  /*transform: translate(0, 0);*/
  /*}*/
  /*25% {*/
  /*-webkit-transform: translate(-64px, 0);*/
  /*transform: translate(-64px, 0);*/
  /*}*/
  /*75% {*/
  /*-webkit-transform: translate(32px, 0);*/
  /*transform: translate(32px, 0);*/
  /*}*/
  /*100% {*/
  /*-webkit-transform: translate(0, 0);*/
  /*transform: translate(0, 0);*/
  /*}*/
  /*}*/
  /*body {*/
  /*background-color: #F5F5F5;*/
  /*}*/

  /*.circle-loader {*/
  /*display: block;*/
  /*width: 64px;*/
  /*height: 64px;*/
  /*margin-left: -32px;*/
  /*margin-top: -32px;*/
  /*position: absolute;*/
  /*left: 50%;*/
  /*top: 50%;*/
  /*-webkit-transform-origin: 16px 16px;*/
  /*transform-origin: 16px 16px;*/
  /*-webkit-animation: rotate-animation 5s infinite;*/
  /*animation: rotate-animation 5s infinite;*/
  /*-webkit-animation-timing-function: linear;*/
  /*animation-timing-function: linear;*/
  /*}*/
  /*.circle-loader .circle {*/
  /*-webkit-animation: move-animation 2.5s infinite;*/
  /*animation: move-animation 2.5s infinite;*/
  /*-webkit-animation-timing-function: linear;*/
  /*animation-timing-function: linear;*/
  /*position: absolute;*/
  /*left: 50%;*/
  /*top: 50%;*/
  /*}*/
  /*.circle-loader .circle-line {*/
  /*width: 64px;*/
  /*height: 24px;*/
  /*position: absolute;*/
  /*top: 4px;*/
  /*left: 0;*/
  /*-webkit-transform-origin: 4px 4px;*/
  /*transform-origin: 4px 4px;*/
  /*}*/
  /*.circle-loader .circle-line:nth-child(0) {*/
  /*-webkit-transform: rotate(0deg);*/
  /*transform: rotate(0deg);*/
  /*}*/
  /*.circle-loader .circle-line:nth-child(1) {*/
  /*-webkit-transform: rotate(90deg);*/
  /*transform: rotate(90deg);*/
  /*}*/
  /*.circle-loader .circle-line:nth-child(2) {*/
  /*-webkit-transform: rotate(180deg);*/
  /*transform: rotate(180deg);*/
  /*}*/
  /*.circle-loader .circle-line:nth-child(3) {*/
  /*-webkit-transform: rotate(270deg);*/
  /*transform: rotate(270deg);*/
  /*}*/
  /*.circle-loader .circle-line .circle:nth-child(1) {*/
  /*width: 8px;*/
  /*height: 8px;*/
  /*top: 50%;*/
  /*left: 50%;*/
  /*margin-top: -4px;*/
  /*margin-left: -4px;*/
  /*border-radius: 4px;*/
  /*-webkit-animation-delay: -0.3s;*/
  /*animation-delay: -0.3s;*/
  /*}*/
  /*.circle-loader .circle-line .circle:nth-child(2) {*/
  /*width: 16px;*/
  /*height: 16px;*/
  /*top: 50%;*/
  /*left: 50%;*/
  /*margin-top: -8px;*/
  /*margin-left: -8px;*/
  /*border-radius: 8px;*/
  /*-webkit-animation-delay: -0.6s;*/
  /*animation-delay: -0.6s;*/
  /*}*/
  /*.circle-loader .circle-line .circle:nth-child(3) {*/
  /*width: 24px;*/
  /*height: 24px;*/
  /*top: 50%;*/
  /*left: 50%;*/
  /*margin-top: -12px;*/
  /*margin-left: -12px;*/
  /*border-radius: 12px;*/
  /*-webkit-animation-delay: -0.9s;*/
  /*animation-delay: -0.9s;*/
  /*}*/
  /*.circle-loader .circle-blue {*/
  /*background-color: #1f4e5a;*/
  /*}*/
  /*.circle-loader .circle-red {*/
  /*background-color: #ff5955;*/
  /*}*/
  /*.circle-loader .circle-yellow {*/
  /*background-color: #ffb265;*/
  /*}*/
  /*.circle-loader .circle-green {*/
  /*background-color: #00a691;*/
  /*}*/
  .load-container {
    width: 240px;
    height: 240px;
    float: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    overflow: hidden;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .load-container a:link,
  .load-container a:visited {
    position: absolute;
    bottom: 3px;
    font-size: 1.15em;
    text-align: center;
    left: 0;
    right: 0;
    text-decoration: none;
    color: #FFF;
  }

  .load-container a:link:hover,
  .load-container a:visited:hover {
    text-decoration: underline;
  }

  .loader {
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
  }

  @media (max-width: 960px) {
    .inner {
      width: 480px;
    }
  }

  @media (max-width: 500px) {
    .inner {
      width: 100%;
    }

    .load-container {
      width: 100%;
    }
  }

  .load7 .loader:before,
  .load7 .loader:after,
  .load7 .loader {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
  }

  .load7 .loader {
    margin: 8em auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  .load7 .loader:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .load7 .loader:after {
    left: 3.5em;
  }

  .load7 .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }

  @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em #6a8dfb;
    }
    40% {
      box-shadow: 0 2.5em 0 0 #6a8dfb;
    }
  }

  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em #6a8dfb;
    }
    40% {
      box-shadow: 0 2.5em 0 0 #6a8dfb;
    }
  }

</style>
