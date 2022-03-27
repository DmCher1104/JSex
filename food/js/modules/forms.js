import {closeModal, openModal} from "./modal";
import {postData} from "../services/services";

//Forms
function forms(formSelector, modalTimerId) {

    let forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так'
    }

    forms.forEach(function (form) {
        bindPostData(form);
    });

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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;