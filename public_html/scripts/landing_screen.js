var loginState = true; //true = login, false = signup

function flipStates() {
  var hidden = document.querySelectorAll('.hidden');
  var shown = document.querySelectorAll('.shown');
  for (var i = 0; i < hidden.length; i++) {
    hidden[i].className = 'shown';
  }
  for (var i = 0; i < shown.length; i++) {
    shown[i].className = 'hidden';
  }
  loginState = !loginState;
}

function pressedLogin() {
  if (loginState === false) {
    flipStates();
  }
  else {
    document.getElementById('loginform').submit();
  }
}

function pressedSignup() {
  if (loginState === true) {
    flipStates();
  }
  else {
    document.getElementById('signupform').submit();
  }
}
