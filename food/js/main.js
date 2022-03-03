document.addEventListener('DOMContentLoaded', function () {


    //Tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");


    function hideTabContent() {

        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {

        if (event.target && event.target.classList.contains('tabheader__item')) {
            console.dir(event);
            tabs.forEach((item, i) => {
                if (event.target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });

        }

    });

    //Timer
    let endTime = '2022-03-08';

    function getTimeRemaning(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    //для красоты (добавления 0 к одному числу)
    function setZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();// чтобы не было задержики в 1сек

        function updateClock() {
            const t = getTimeRemaning(endTime);

            days.innerHTML = setZero(t.days);
            hours.innerHTML = setZero(t.hours);
            minutes.innerHTML = setZero(t.minutes);
            seconds.innerHTML = setZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', endTime);


    //Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {

        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    window.addEventListener('scroll', showModalByScroll);

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


    //Classes to the cards
    class MenuCard {

        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.price = price;
            this.transfer = 2.645 //на 22.02.22
            this.changeToBYN();
        }

        changeToBYN() {
            this.price = Math.floor(this.price * this.transfer);
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(function (className) {
                    element.classList.add(className);
                });
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;

            this.parent.append(element);
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих\n' +
        'овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой\n' +
        'и высоким качеством!',
        14,
        '.menu .container',
        'menu__item',
        'justForCheck'
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, \n' +
        ' но и  качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в  ресторан!',
        200,
        '.menu .container',
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие \n' +
        'продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество \n' +
        'белков за счет тофу и импортных вегетарианских стейков.',
        140,
        '.menu .container',
        'menu__item'
    ).render();

    //Forms
    let forms = document.querySelectorAll('form');

    const message = {
        loading: 'Идет загрузка...',
        success: 'Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так'
    }

    forms.forEach(function (form) {
        postData(form);
    });

    function postData(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const req = new XMLHttpRequest();
            req.open('POST', 'server.php');

            //устан-ся автоматически (FormData c XMLHttpRequest)
            // req.setRequestHeader('Content-type', 'multipart/form-data');
            // const formData = new FormData(form);
            // req.send(formData);

            //через json
            req.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const  obj = {};

            formData.forEach(function (value,key){
               obj[key] = value;
            });

            const json = JSON.stringify(obj);
            req.send(json);


            req.addEventListener('load', function () {
                if (req.status === 200) {
                    console.log(req.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(function (){
                        statusMessage.remove();
                    },4000);

                } else {
                    statusMessage.textContent = message.failure;
                }

            });

        });
    }
});
