const ark1 = document.getElementById("ark-display");
const ark2 = document.getElementById("ark-button");
const eco1 = document.getElementById("eco-display");
const eco2 = document.getElementById("eco-button");
const minecraft1 = document.getElementById("minecraft-display");
const minecraft2 = document.getElementById("minecraft-button");
const empyrion1 = document.getElementById("empyrion-display");
const empyrion2 = document.getElementById("empyrion-button");
const rust1 = document.getElementById("rust-display"); 
const rust2 = document.getElementById("rust-button");
const serverBkg = document.getElementById("servers");

function applyAnimation(element, animationClass) {
    element.classList.add(animationClass);
  
    // Listen for the animation end event
    element.addEventListener('animationend', function () {
      element.classList.remove(animationClass);
    });
  }


function ark() {
    // Change the images
    ark1.classList?.remove("d-none");
    eco1.classList?.add("d-none");
    minecraft1?.classList.add("d-none");
    empyrion1?.classList.add("d-none");
    rust1?.classList.add("d-none");
    console.log("ark executed"); 
    // Hightlight button
    ark2.setAttribute('style', 'border: 5px solid yellow');
    eco2.setAttribute('style', 'border: 5px solid black');
    minecraft2.setAttribute('style', 'border: 5px solid black');
    empyrion2.setAttribute('style', 'border: 5px solid black');
    rust2.setAttribute('style', 'border: 5px solid black');
    // Change Background
    serverBkg.classList?.remove("eco-bkg", "minecraft-bkg", "empyrion-bkg", "rust-bkg");
    serverBkg.classList?.add("ark-bkg");
    applyAnimation(ark1, 'slide-in-from-right');
  }

function eco() {
    // Change the images
    eco1?.classList.remove("d-none");
    ark1?.classList.add("d-none");
    minecraft1?.classList.add("d-none");
    empyrion1?.classList.add("d-none");
    rust1?.classList.add("d-none");
    console.log("eco executed");  
    // Hightlight button
    eco2.setAttribute('style', 'border: 5px solid yellow');
    ark2.setAttribute('style', 'border: 5px solid black');
    minecraft2.setAttribute('style', 'border: 5px solid black');
    empyrion2.setAttribute('style', 'border: 5px solid black');
    rust2.setAttribute('style', 'border: 5px solid black'); 
    // Change Background
    serverBkg.classList?.remove("ark-bkg", "minecraft-bkg", "empyrion-bkg", "rust-bkg");
    serverBkg.classList?.add("eco-bkg");
      // Apply the animation to the eco-display element
    applyAnimation(eco1, 'slide-in-from-right');
}

function minecraft() {
    // Change the images
    minecraft1?.classList.remove("d-none");
    ark1?.classList.add("d-none");
    empyrion1?.classList.add("d-none");
    eco1?.classList.add("d-none");
    rust1?.classList.add("d-none");
    console.log("empyrion executed");
    // Hightlight button
    minecraft2.setAttribute('style', 'border: 5px solid yellow');
    ark2.setAttribute('style', 'border: 5px solid black');
    eco2.setAttribute('style', 'border: 5px solid black');
    empyrion2.setAttribute('style', 'border: 5px solid black');
    rust2.setAttribute('style', 'border: 5px solid black'); 
    // Change Background
    serverBkg.classList?.remove("ark-bkg", "eco-bkg", "empyrion-bkg", "rust-bkg");
    serverBkg.classList?.add("minecraft-bkg");   
}

function empyrion() {
    // Change the images
    empyrion1?.classList.remove("d-none");
    ark1?.classList.add("d-none");
    minecraft1?.classList.add("d-none");
    eco1?.classList.add("d-none");
    rust1?.classList.add("d-none");
    console.log("empyrion executed");   
    // Hightlight button
    empyrion2.setAttribute('style', 'border: 5px solid yellow');
    ark2.setAttribute('style', 'border: 5px solid black');
    minecraft2.setAttribute('style', 'border: 5px solid black');
    eco2.setAttribute('style', 'border: 5px solid black');
    rust2.setAttribute('style', 'border: 5px solid black'); 
    // Change Background
    serverBkg.classList?.remove("ark-bkg", "eco-bkg", "minecraft-bkg", "rust-bkg");
    serverBkg.classList?.add("empyrion-bkg");  
}

function rust() {
    // Change the images
    rust1?.classList.remove("d-none");
    ark1?.classList.add("d-none");
    minecraft1?.classList.add("d-none");
    eco1?.classList.add("d-none");
    empyrion1?.classList.add("d-none");
    console.log("empyrion executed");   
    // Hightlight button
    rust2.setAttribute('style', 'border: 5px solid yellow');
    ark2.setAttribute('style', 'border: 5px solid black');
    minecraft2.setAttribute('style', 'border: 5px solid black');
    empyrion2.setAttribute('style', 'border: 5px solid black');
    eco2.setAttribute('style', 'border: 5px solid black'); 
    // Change Background
    serverBkg.classList?.remove("ark-bkg", "eco-bkg", "minecraft-bkg", "empyrion-bkg");
    serverBkg.classList?.add("rust-bkg");  
}


AOS.init();
 

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const sectionId = entry.target.id;
      const navLink = document.getElementById(`nav-${sectionId}`);
      
      if (entry.isIntersecting) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    });
  }, { threshold: 0.5 });
  
  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    observer.observe(section);
  });
  
  function scrollToServers(event) {
    event.preventDefault();
    const serversSection = document.getElementById("servers");
    const navHeight = document.querySelector(".navtop").offsetHeight;
    const yOffset = serversSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: yOffset, behavior: "smooth" });
  }
  
  function scrollToAbout(event) {
    event.preventDefault();
    const aboutSection = document.getElementById("about");
    const navHeight = document.querySelector(".navtop").offsetHeight;
    const yOffset = aboutSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: yOffset, behavior: "smooth" });
  }
  

