/* function goToHome() {
    window.location.href = 'index.html';
} */
  
/* function goToGCversary() {
    window.location.href = 'first-gcversary.html';
} */
  
  function initializeNavToggle() {
    const navBarBtns = document.getElementById('nav-bar-btns');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuIconPath = document.querySelector('#menu-toggle-btn svg path'); 
  
    const hamburgerPath = 'M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z';
    const closePath = 'm240-200 200-200 200 200 56-56-200-200 200-200-56-56-200 200-200-200-56 56 200 200-200 200 56 56Z';
  
    if (!navBarBtns || !menuToggleBtn || !menuIconPath) {
      console.error("Navigation elements not found.");
      return;
    }
  
    menuToggleBtn.addEventListener('click', () => {
      const isExpanded = navBarBtns.classList.toggle('menu-open');
      menuToggleBtn.setAttribute('aria-expanded', isExpanded);
  
  if (isExpanded) {
      menuIconPath.setAttribute('d', closePath);
          } else {
            menuIconPath.setAttribute('d', hamburgerPath);
          }
      });
      window.addEventListener('resize', () => {
          const isMobileView = window.innerWidth <= 385;
          const isMenuOpen = navBarBtns.classList.contains('menu-open');
  
  if (!isMobileView && isMenuOpen) {
        navBarBtns.classList.remove('menu-open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
        menuIconPath.setAttribute('d', hamburgerPath);
      }
    });
  }
  
  window.onload = initializeNavToggle;
  
  const primaryHeader = document.querySelector('#nav-bar');
  const scrollWatcher = document.createElement('div');
  
  scrollWatcher.setAttribute('data-scroll-watcher', '');
  primaryHeader.before(scrollWatcher);
  
  const navObserver = new IntersectionObserver((entries) => {
    primaryHeader.classList.toggle('sticking', !entries[0].isIntersecting)
  });
  
  navObserver.observe(scrollWatcher);
