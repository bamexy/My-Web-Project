const body = document.querySelector("body");
const logo = document.querySelector("#logo");
const theme = document.querySelector("#theme");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");
const shorten = document.querySelectorAll(".shorten");
const shortenBefore = document.querySelector(".shorten-before");
const inputBefore = document.querySelector("#input-before");
const inputAfter = document.querySelector("#input-after");
const shortenAfter = document.querySelector(".shorten-after");
const modal = document.querySelector("#modal");
const modalText = document.querySelector("#modal-content > p.desc");

theme.addEventListener("click", () => {
  body.classList.toggle("dark");
})

navLinks.forEach(nav => {
  const targetId = nav.getAttribute("data-nav");
  const targetPage = document.querySelector(`#${targetId}`);
  
  nav.addEventListener("click", () => {
    const presentPage = document.querySelectorAll(".page:not(.hide)")[0];
    presentPage.classList.add("hide");
    targetPage.classList.remove("hide");
  })
})

const showModal = (content) => {
    modalText.textContent = content;
    modal.classList.add("show");
      
    setTimeout(() => modal.classList.remove("show"), 3000);
  }

const linkRegex = /https:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?/g;

const checkLinkSecurity = (link) => {
    if (link.match(linkRegex)) {
      inputBefore.value = link;
      shorten[0].textContent = "Shorten Link";
    } else if (link.startsWith("http://")) {
      showModal("The link you tried pasting isn't secure.");
      inputBefore.value = "";
      shorten[0].textContent = "Paste";
    } else {
      showModal("Invalid link format, please try a valid website link or try copying the link again");
      inputBefore.value = "";
      shorten[0].textContent = "Paste";
    }
  }

shorten[0].addEventListener("click", async () => {
  if (shorten[0].textContent === "Paste") {
    try {
      const clipBoardLink = await navigator.clipboard.readText();
      checkLinkSecurity(clipBoardLink);
    } catch (err) {
      showModal("Error pasting link!");
    }
  }

  if (shorten[0].textContent === "Shorten Link") {
      shortenBefore.classList.add("hide");
      shortenAfter.classList.remove("hide");
    
      setTimeout(() => {
        shortenBefore.classList.remove("hide");
        shortenAfter.classList.add("hide");
      }, 5000)
  }
})

shorten[1].addEventListener("click", async () => {
  try {
    const copied = await navigator.clipboard.writeText(inputAfter.value);
    if (copied === undefined && inputAfter.value.length > 1) {
      showModal("Link copied!");
    }
  } catch (err) {
    showModal("Could not copy link!");
  }
})

inputBefore.addEventListener("input", () => {
  if (inputBefore.value.length > 0) {
    shorten[0].textContent = "Shorten Link";
    checkLinkSecurity(inputBefore.value);
  } else if (inputBefore.value.length === 0) {
    shorten[0].textContent = "Paste";
  }
})

// GSAP ANIMATIONS

