document.querySelector('.main_button').addEventListener('click', function(e) {
  document.querySelector('.modal-container').classList.remove('hideAnimation');
  document.querySelector('.modal').classList.remove('hide')
});

function element(){
  document.querySelector('.modal-container').classList.add('hideAnimation');
  setTimeout(function() {
    document.querySelector('.modal').classList.add('hide')
  },1000)
}
document.querySelector('.modal-container_buttons--cancel').addEventListener('click', element);


document.querySelector('.modal-container_buttons--uninstall').addEventListener('click', element);
document.querySelector('.modal-container__button-close').addEventListener('click',element);



