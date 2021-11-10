var elem = document.querySelector('.sidenav');
var instance = new M.Sidenav(elem);

$(document).ready(function(){
  $('.sidenav').sidenav();
});

$(".dropdown-trigger").dropdown(
    {
        hover: true,
        constrainWidth: true
    }
);

$(document).ready(function () {
    $('.materialboxed').materialbox();
});

$(document).ready(function () {
    $('select').formSelect();
});

$(document).ready(function () {
    M.updateTextFields();
});
M.toast({html: 'I am a toast!'})
