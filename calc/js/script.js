"use strict"

const inputRub = document.querySelector('#rub'),
    inputDol = document.querySelector('#usd');

inputRub.addEventListener('input', function () {
        const request = new XMLHttpRequest();

        request.open('GET', 'js/current.json');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.send();

        request.addEventListener('load', function (){

            if (request.status === 200){
                const data = JSON.parse(request.response);
                inputDol.value = (+inputRub.value / data.current.usd).toFixed(3);
                console.log( inputDol.value);
            }else{
                inputDol.value = 'FUCK U :) -> '+ request.status;
                console.log("Здесь произошла какая то хрень");
            }

        });
});

