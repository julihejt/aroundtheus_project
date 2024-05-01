/* ------------------------------ import ----------------------------- */

import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import * as constants from "../utils/constants.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import "../pages/index.css";

import { profileEditModalEl } from "../utils/constants.js";

import avatarImage from "../images/jacques-cousteau(1).png";

const avatarImageEl = document.querySelector(".profile__image");
avatarImageEl.src = avatarImage;
console.log("test");
/* -------------------------------- elements -------------------------------- */

const formValidation = new FormValidation(formSettings, profileEditForm);
formValidation.enableValidation();

const addCardValidator = new FormValidation(formSettings, addForm);
addCardValidator.enableValidation();

/* -------------------------------- function -------------------------------- */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

function handleImageClick(cardData) {
  modalImageSrc.setAttribute("src", cardData.link);
  modalImageSrc.setAttribute("alt", cardData.name);
  modalImageDescription.textContent = cardData.name;
  openPopup(cardImageModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = placeInput.value;
  const link = placeInputUrl.value;
  createCard({ name, link });
  addForm.reset();
  closePopup(addModal);
}

function getCard(data, templateSelector, handleImageClick) {
  const card = new Card(data, templateSelector, handleImageClick);
  return card.getView();
}

function createCard(cardData) {
  const cardElement = getCard(cardData, "#card-template", handleImageClick);
  cardListEl.prepend(cardElement);
}

/* ----------------------------- event listener ----------------------------- */
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});

initialCards.forEach((cardData) => {
  createCard(cardData);
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openPopup(profileEditModal);
});

profileCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

modalImageCloseButton.addEventListener("click", () => {
  closePopup(cardImageModal);
});

profileAddButton.addEventListener("click", () => {
  openPopup(addModal);
});

addForm.addEventListener("submit", handleAddCardSubmit);

closeButtonPlace.addEventListener("click", () => {
  closePopup(addModal);
});
