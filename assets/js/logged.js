const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('username');
document.getElementById('uname').textContent = userName;