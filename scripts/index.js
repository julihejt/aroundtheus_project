/* ------------------------------ initian cards ----------------------------- */
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

/* -------------------------------- elements -------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector("#profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditSubmit = profileEditModal.querySelector("#edit-save-button");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addModal = document.querySelector("#profile__add-form");
const addForm = document.querySelector("#add__card-form");
const placeInput = document.querySelector("#addCard-title-input");
const placeInputUrl = document.querySelector("#addCard-description-input");
const closeButtonPlace = document.querySelector("#profile__close-modal");
const cardImageModal = document.querySelector("#card__image_modal");
const modalImageCloseButton = document.querySelector(
  "#modal__image-close-button"
);
const modalImageSrc = document.querySelector("#modal__image");
const modalImageDescription = document.querySelector(
  "#modal__image_description"
);
const modal = document.querySelector(".modal");
const modals = document.querySelectorAll(".modal");
const modalContainer = document.querySelector(".modal__container");
const editModalWindow = document.querySelector("#profile-edit-modal");
const addModalWindow = document.querySelector("#profile-edit-button");

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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalImageSrc.setAttribute("src", cardData.link);
    modalImageSrc.setAttribute("alt", cardData.name);
    modalImageDescription.textContent = cardData.name;
    openPopup(cardImageModal);
  });

  return cardElement;
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = placeInput.value;
  const link = placeInputUrl.value;
  const newCardElement = getCardElement({ name, link });
  cardListEl.prepend(newCardElement);
  addForm.reset();
  closePopup(addModal);
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
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
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
