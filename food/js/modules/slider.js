//Slider
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner}) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesInner = document.querySelector(inner);

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
    slider.insertAdjacentElement('beforeend', dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i === 0) {
            dot.style.opacity = '1';
        }

        dots.insertAdjacentElement('beforeend', dot);
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
}

export default slider;