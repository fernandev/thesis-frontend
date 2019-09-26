function toggleNav() {
  document.body.style.backgroundColor === 'white' || document.body.style.backgroundColor === ''? openNav(): closeNav();
};

function openNav() {
  document.getElementById('navButton').innerHTML = "&times; Menu";
  document.getElementById('mySidenav').style.width = '250px';
  document.getElementById('title').style.marginLeft = '242px';
  document.getElementById('main').style.marginLeft= '242px';
  document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
};

function closeNav() {
  document.getElementById('navButton').innerHTML = "&#9776; Menu";
  document.getElementById('mySidenav').style.width = '0';
  document.getElementById('title').style.marginLeft= '-8px';
  document.getElementById('main').style.marginLeft= '-8px';
  document.body.style.backgroundColor = 'white';
};
