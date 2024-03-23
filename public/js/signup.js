document
  .getElementById('signupForm')
  .addEventListener('submit', function (event) {
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const errorMessage = document.getElementById('errorMessage');
    if (password.length < 8) {
      event.preventDefault();
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Password should be atleast 8 characters';
    } else if (password !== repeatPassword) {
      event.preventDefault();
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Password mismatch';
    } else {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }
  });
