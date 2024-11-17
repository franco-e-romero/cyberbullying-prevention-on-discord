let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);

const signNowButton = document.getElementById("sign-now-button");

const addSignature = (person) => {
    let newSignature = document.createElement('p');
    newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this cause.`;
    document.querySelector(".signatures").appendChild(newSignature);
};

const validateForm = (event) => {
    let containsErrors = false;
    let petitionInputs = document.getElementById("sign-petition").elements;

    let person = {
        name: petitionInputs[0].value,
        hometown: petitionInputs[1].value,
        email: petitionInputs[2].value,
    };

    if (person.name.length < 2) {
        petitionInputs[0].classList.add('error');
        containsErrors = true;
    } else {
        petitionInputs[0].classList.remove('error');
    }
    if (person.hometown.length < 2) {
        petitionInputs[1].classList.add('error');
        containsErrors = true;
    } else {
        petitionInputs[1].classList.remove('error');
    }
    if (!person.email.includes('@')) {
        petitionInputs[2].classList.add('error');
        containsErrors = true;
    } else {
        petitionInputs[2].classList.remove('error');
    }

    if (!containsErrors) {
        addSignature(person);
        toggleModal(person);
    }
};

signNowButton.addEventListener('click', validateForm);

let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add('active');
        } else {
            revealableContainers[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', reveal);

let scaleFactor = 1;
const modalImage = document.getElementById("modal-image");

const scaleImage = () => {
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;
    modalImage.style.transform = `scale(${scaleFactor})`;
};

const toggleModal = (person) => {
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("thanks-modal-content");

    modal.style.display = "flex";
    modalContent.textContent = `Thank you so much, ${person.name} from ${person.hometown}!`;

    const intervalId = setInterval(scaleImage, 500);

    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 4000);
};
