document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = signupForm[0].value;
      const password = signupForm[1].value;
      localStorage.setItem('user', JSON.stringify({ username, password }));
      alert('Signup successful!');
      window.location.href = 'login.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = loginForm[0].value;
      const password = loginForm[1].value;
      const savedUser = JSON.parse(localStorage.getItem('user'));

      if (savedUser && savedUser.username === username && savedUser.password === password) {
        alert('Login successful!');
        window.location.href = 'blog.html';
      } else {
        alert('Invalid credentials');
      }
    });
  }
});
