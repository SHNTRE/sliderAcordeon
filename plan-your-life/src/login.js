$('document').ready(function(){
  
  $('[data-login-button], [data-logout-button]').click(function(){
    $('[data-login-form], [data-login-user]').toggleClass('state-hidden');
    $('[data-header]').toggleClass('state-logged-in');
  });
  
});