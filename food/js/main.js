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
    let endTime = '2022-03-31';

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
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    modal.addEventListener('click', (event) => {

        if (event.target === modal || event.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

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

    //через библиотеку axios
    axios.get('http://localhost:3000/menu').then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    /* const getData = async function (url) {
        const res = await fetch(url);

        if (!res.ok){
           throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }*/

    /*getData('http://localhost:3000/menu').then(function (data){
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });*/

    /* new MenuCard(
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
    ).render();*/


    //Forms
    let forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так'
    }

    forms.forEach(function (form) {
        bindPostData(form);
    });

    const postData = async function (url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // const req = new XMLHttpRequest();
            // req.open('POST', 'server.php');

            //устан-ся автоматически (FormData c XMLHttpRequest)
            // req.setRequestHeader('Content-type', 'multipart/form-data');
            // const formData = new FormData(form);
            // req.send(formData);

            //через json
            // req.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            //1 перевод из formData в json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            //2 перевод из formData в json
            /*const obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });*/

            // req.send(json);

            /*req.addEventListener('load', function () {
                if (req.status === 200) {

                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }

            });*/

            //исп-ие Fetch вместо XMLHttpRequest
            postData('http://localhost:3000/requests', json).then(function (data) {
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            }).catch(function () {
                showThanksModal(message.failure);
            }).finally(function () {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(function () {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //Slider


    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesInner = document.querySelector('.offer__slider-inner');

    let offset = 0;
    let indexSlide = 1;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${indexSlide}`;
    } else {
        total.textContent = slides.length;
        current.textContent = indexSlide;
    }

    slidesInner.style.width = 100 * slides.length + '%';
    slidesInner.style.display = 'flex';
    slidesInner.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const dots = document.createElement('ol'),
        arrDots = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i === 0) {
            dot.style.opacity = '1';
        }

        dots.append(dot);
        arrDots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (indexSlide == slides.length) {
            indexSlide = 1;
        } else {
            indexSlide++;
        }

        if (slides.length < 10) {
            current.textContent = `0${indexSlide}`;
        } else {
            current.textContent = indexSlide;
        }

        arrDots.forEach(dot => {
            dot.style.opacity = '0.5';
        });
        arrDots[indexSlide - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (indexSlide == 1) {
            indexSlide = slides.length;
        } else {
            indexSlide--;
        }

        if (slides.length < 10) {
            current.textContent = `0${indexSlide}`;
        } else {
            current.textContent = indexSlide;
        }

        arrDots.forEach(dot => {
            dot.style.opacity = '0.5';
        });
        arrDots[indexSlide - 1].style.opacity = '1';
    });

    arrDots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            indexSlide = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesInner.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${indexSlide}`;
            } else {
                current.textContent = indexSlide;
            }

            arrDots.forEach(dot => {
                dot.style.opacity = '0.5';
            });
            arrDots[indexSlide - 1].style.opacity = '1';
        });
    });

    /*showSlides(indexSlide);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = indexSlide;
    }

    function showSlides(n) {
        if (n > slides.length)
            indexSlide = 1;
        if (n < 1)
            indexSlide = slides.length;

        slides.forEach(function (item) {
            item.style.display = 'none';
        });

        slides[indexSlide - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${indexSlide}`;
        } else {
            current.textContent = indexSlide;
        }
    }

    function plusSlides(n) {
        showSlides(indexSlide += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    });*/
});
