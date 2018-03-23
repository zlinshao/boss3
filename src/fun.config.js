

document.body.addEventListener('DOMSubtreeModified',function (e) {
  if(document.getElementsByClassName('v-modal').length>0){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
});
