document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu__icon');
    const menu = document.querySelector('.menu');
    const menuClose = document.querySelector('.menu__close-button');
    const menuOverlay = document.querySelector('.header__overlay');
    if (!menuIcon || !menu || !menuClose || !menuOverlay) {
        console.error('One or more elements not found!');
        return;
    }

    menuIcon.addEventListener('click', () => {
        menu.classList.add('menu--active');
        menuOverlay.classList.add('visible');
    });

    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    function closeMenu() {
        menu.classList.remove('menu--active');
        menuOverlay.classList.remove('visible');
    }
});


document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    resetErrors();

    let hasError = false;

    if (name === '') {
        showError('nameError', 'Введите ваше имя.');
        hasError = true;
    }

    if (email === '') {
        showError('emailError', 'Введите ваш email.');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError('emailError', 'Введите корректный email.');
        hasError = true;
    }

    if (message === '') {
        showError('messageError', 'Введите сообщение.');
        hasError = true;
    }

    if (hasError) return;

    sendData({ name, email, message });
});

function resetErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    const input = errorElement.previousElementSibling;
    if (input) input.classList.add('error');
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendData(data) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            alert('Ваше сообщение успешно отправлено!');
            console.log('Ответ сервера:', data);
        })
        .catch(error => {
            alert('Произошла ошибка при отправке сообщения.');
            console.error('Ошибка:', error);
        });
}
