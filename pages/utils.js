// utils.js

// Function to close a popup/modal
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

// Function to open a popup/modal
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

// Function to close a popup/modal when pressing escape key
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

// Function to handle image click
function handleImageClick(cardData) {
  modalImageSrc.setAttribute("src", cardData.link);
  modalImageSrc.setAttribute("alt", cardData.name);
  modalImageDescription.textContent = cardData.name;
  openPopup(cardImageModal);
}

// Export utility functions
export { closePopup, openPopup, closeModalByEscape, handleImageClick };
