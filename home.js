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

function initializeGoToTop() {
   const goToTopBtn = document.getElementById('go-to-top-btn');
   const SCROLL_TRIGGER = 200;
  
   if (!goToTopBtn) {
    console.error("Go to Top button not found.");
    return;
   }
  
   window.onscroll = function() {
    if (document.body.scrollTop > SCROLL_TRIGGER || document.documentElement.scrollTop > SCROLL_TRIGGER) {
     
     goToTopBtn.classList.add('show-btn');
    } else {
     
     goToTopBtn.classList.remove('show-btn');
    }
   };
  
   goToTopBtn.addEventListener('click', () => {
    window.scrollTo({
     top: 0,
     behavior: 'smooth' 
    });
   });
  }

  function initializeCopyCardButtons() {
      const copyCardBtns = document.querySelectorAll('.copy-card-btn');
    
      copyCardBtns.forEach(button => {
        button.addEventListener('click', async (event) => {
          const memberCard = event.target.closest('.member-card');
          if (!memberCard) {
            console.error("Could not find parent member card.");
            return;
          }

          const cardClone = memberCard.cloneNode(true);
          const buttonToRemove = cardClone.querySelector('.copy-card-btn');
          if (buttonToRemove) {
            buttonToRemove.remove();
          }
    
          let contentToCopy = cardClone.innerText.trim();
          contentToCopy = contentToCopy.replace(/\n\s*\n/g, '\n').replace(/\s*:\s*/g, ': ');
          
          try {
            await navigator.clipboard.writeText(contentToCopy);
            
            button.style.backgroundColor = 'green';
            setTimeout(() => {
              button.style.backgroundColor = 'red';
            }, 1000);
    
          } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy card data! Please check console for details.');
          }
        });
      });
    }

    function initializeTypewriterEffect() {
        const targetElement = document.getElementById('animated-title-text');
        const cursorElement = document.getElementById('typewriter-cursor');
        
        const fullText = "Brawl Stars GC";
        let i = 0;
        const typingSpeed = 50;
        const deleteSpeed = 50;
        const delayAfterTyping = 1000;
        if (!targetElement || !cursorElement) {
          console.error("Typewriter target element or cursor not found.");
          return;
        }
      
        targetElement.textContent = '';
      
        function typeWriter() {
          if (i < fullText.length) {
            targetElement.textContent += fullText.charAt(i);
            
            if (targetElement.textContent.endsWith('GC')) {
              const parts = targetElement.textContent.split('GC');
              targetElement.innerHTML = `<span class="white-txt">${parts[0].trim()}</span> <span class="red-txt">GC</span>`;
              const navBar = document.getElementById('nav-bar');
              if (navBar && navBar.classList.contains('sticking')) {
                targetElement.querySelector('.white-txt').style.color = 'red';
                targetElement.querySelector('.red-txt').style.color = 'white';
              }
            } else {
              targetElement.classList.remove('red-txt');
              targetElement.classList.add('white-txt');
            }
      
            i++;
            setTimeout(typeWriter, typingSpeed);
          } else {
            setTimeout(() => {
              cursorElement.style.visibility = 'hidden';
              cursorElement.style.animation = 'none';
            }, delayAfterTyping);
          }
        }
      
        typeWriter();
      }
    
    
    window.onload = function() {
     initializeNavToggle();
     initializeGoToTop();
     initializeCopyCardButtons();
     initializeTypewriterEffect();
     
     AOS.init({
      duration: 800, 
      once: true, 
      easing: 'ease-in-out', 
     });
    };

AOS.init({
  duration: 800, 
  once: true,  
  easing: 'ease-in-out', 
});
 
 const primaryHeader = document.querySelector('#nav-bar');
 const scrollWatcher = document.createElement('div');
 
 scrollWatcher.setAttribute('data-scroll-watcher', '');
 primaryHeader.before(scrollWatcher);
 
 const navObserver = new IntersectionObserver((entries) => {
  primaryHeader.classList.toggle('sticking', !entries[0].isIntersecting)
 });
 
 navObserver.observe(scrollWatcher);
