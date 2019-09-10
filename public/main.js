document.querySelector('.main_button').addEventListener('click', function(e) {
  document.querySelector('.modal').classList.remove('hideAnimation');
  document.querySelector('.modal').classList.remove('hide')
});


document.querySelector('.modal-container_buttons--cancel').addEventListener('click', function(e) {
  document.querySelector('.modal').classList.add('hideAnimation');
  setTimeout(function() {
    document.querySelector('.modal').classList.add('hide')
  },1000)

});
document.querySelector('.modal-container_buttons--uninstall').addEventListener('click', function(e) {
  document.querySelector('.modal').classList.add('hide');
  setTimeout(function() {
    document.querySelector('.modal').classList.add('hide')
  },1000)
});
document.querySelector('.modal-container__button-close').addEventListener('click', function(e) {
  document.querySelector('.modal').classList.add('hide');
  setTimeout(function() {
    document.querySelector('.modal').classList.add('hide')
  },1000)
});