window.addEventListener('load', function () {
    sessionStorage.clear();
    console.log('sessionStorage очищен при загрузке страницы');
});

// Релулярное выражение
const regex = /\d+(?:[.,]\d+)?/g;

// Получаем доступ к нужным полям таблицы первого танка
let crc1_img = document.getElementById('crc1-img');
let crc1_0 = document.getElementById('crc1-0');
let crc1_1 = document.getElementById('crc1-1');
let crc1_2 = document.getElementById('crc1-2');
let crc1_3 = document.getElementById('crc1-3');
let crc1_4 = document.getElementById('crc1-4');
let crc1_5 = document.getElementById('crc1-5');
let crc1_6 = document.getElementById('crc1-6');
let crc1_7 = document.getElementById('crc1-7');
let crc1_8 = document.getElementById('crc1-8');
let crc1_9 = document.getElementById('crc1-9');
let crc1_10 = document.getElementById('crc1-10');
let crc1_11 = document.getElementById('crc1-11');
let crc1_12 = document.getElementById('crc1-12');
let crc1_13 = document.getElementById('crc1-13');

// Получаем доступ к нужным полям таблицы второго танка
let crc2_img = document.getElementById('crc2-img');
let crc2_0 = document.getElementById('crc2-0');
let crc2_1 = document.getElementById('crc2-1');
let crc2_2 = document.getElementById('crc2-2');
let crc2_3 = document.getElementById('crc2-3');
let crc2_4 = document.getElementById('crc2-4');
let crc2_5 = document.getElementById('crc2-5');
let crc2_6 = document.getElementById('crc2-6');
let crc2_7 = document.getElementById('crc2-7');
let crc2_8 = document.getElementById('crc2-8');
let crc2_9 = document.getElementById('crc2-9');
let crc2_10 = document.getElementById('crc2-10');
let crc2_11 = document.getElementById('crc2-11');
let crc2_12 = document.getElementById('crc2-12');
let crc2_13 = document.getElementById('crc2-13');

// Функция для сравнения данных танков. Красит нужные элементы таблицы в зеленый цвет
function compareTanks(t1, t2) {
    // Парсим данные первого и второго танка из json объектов
    let img_1 = t1['images_url']
    let img_2 = t2['images_url']
    let name_1 = t1['nametank']
    let name_2 = t2['nametank']
    let hull_1 = t1['hull_armor'].trim().match(regex).map(num => parseFloat(num.replace(',', '.')));
    let hull_2 = t2['hull_armor'].trim().match(regex).map(num => parseFloat(num.replace(',', '.')));
    let turret_1 = t1['turret_armor'].trim().match(regex).map(num => parseFloat(num.replace(',', '.')));
    let turret_2 = t2['turret_armor'].trim().match(regex).map(num => parseFloat(num.replace(',', '.')));
    let c_1 = parseInt(t1['team'].replace(/[^0-9]/g, ''));
    let c_2 = parseInt(t2['team'].replace(/[^0-9]/g, ''));
    let mob_1 = t1['mobility'].trim().match(regex).map(num => parseFloat(num.replace(',', '.')));
    let mob_2 = t2['mobility'].trim().match(regex).map(num => parseFloat(num.replace(',', '.')));
    let arm_1 = parseInt(t1['armament']);
    let arm_2 = parseInt(t2['armament']);

    // Сравниваем
    if (hull_1[0] > hull_2[0]) {
        crc1_1.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_1.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else if (hull_1[0] < hull_2[0]) {
        crc2_1.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_1.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else {
        crc1_1.style.backgroundColor = 'rgb(230, 230, 230)';
        crc2_1.style.backgroundColor = 'rgb(230, 230, 230)';
    }

    if (hull_1[1] > hull_2[1]) {
        crc1_2.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_2.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else if (hull_1[1] < hull_2[1]) {
        crc2_2.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_2.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else {
        crc1_2.style.backgroundColor = 'rgb(230, 230, 230)';
        crc2_2.style.backgroundColor = 'rgb(230, 230, 230)';
    }

    if (hull_1[2] > hull_2[2]) {
        crc1_3.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_3.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else if (hull_1[2] < hull_2[2]) {
        crc2_3.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_3.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else {
        crc1_3.style.backgroundColor = 'rgb(230, 230, 230)';
        crc2_3.style.backgroundColor = 'rgb(230, 230, 230)';
    }

    if (turret_1[0] > turret_2[0]) {
        crc1_4.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_4.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else if (turret_1[0] < turret_2[0]) {
        crc2_4.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_4.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else {
        crc1_4.style.backgroundColor = 'rgb(230, 230, 230)';
        crc2_4.style.backgroundColor = 'rgb(230, 230, 230)';
    }

    if (turret_1[1] > turret_2[1]) {
        crc1_5.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_5.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else if (turret_1[1] < turret_2[1]) {
        crc2_5.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_5.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else {
        crc1_5.style.backgroundColor = 'rgb(230, 230, 230)';
        crc2_5.style.backgroundColor = 'rgb(230, 230, 230)';
    }

    if (turret_1[2] > turret_2[2]) {
        crc1_6.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_6.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else if (turret_1[2] < turret_2[2]) {
        crc2_6.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_6.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else {
        crc1_6.style.backgroundColor = 'rgb(230, 230, 230)';
        crc2_6.style.backgroundColor = 'rgb(230, 230, 230)';
    }

    if (c_1 > c_2) {
        crc1_7.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_7.style.backgroundColor = '#F3F3F3';
    }
    else if (c_1 < c_2) {
        crc2_7.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_7.style.backgroundColor = '#F3F3F3';
    }
    else {
        crc1_7.style.backgroundColor = '#F3F3F3';
        crc2_7.style.backgroundColor = '#F3F3F3';
    }

    if (mob_1[0] > mob_2[0]) {
        crc1_8.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_8.style.backgroundColor = '#F3F3F3';
    }
    else if (mob_1[0] < mob_2[0]) {
        crc2_8.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_8.style.backgroundColor = '#F3F3F3';
    }
    else {
        crc1_8.style.backgroundColor = '#F3F3F3';
        crc2_8.style.backgroundColor = '#F3F3F3';
    }

    if (mob_1[1] > mob_2[1]) {
        crc1_9.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_9.style.backgroundColor = '#F3F3F3';
    }
    else if (mob_1[1] < mob_2[1]) {
        crc2_9.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_9.style.backgroundColor = '#F3F3F3';
    }
    else {
        crc1_9.style.backgroundColor = '#F3F3F3';
        crc2_9.style.backgroundColor = '#F3F3F3';
    }

    if (mob_1[2] > mob_2[2]) {
        crc1_10.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_10.style.backgroundColor = '#F3F3F3';
    }
    else if (mob_1[2] < mob_2[2]) {
        crc2_10.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_10.style.backgroundColor = '#F3F3F3';
    }
    else {
        crc1_10.style.backgroundColor = '#F3F3F3';
        crc2_10.style.backgroundColor = '#F3F3F3';
    }

    if (mob_1[3] > mob_2[3]) {
        crc1_11.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_11.style.backgroundColor = '#F3F3F3';
    }
    else if (mob_1[3] < mob_2[3]) {
        crc2_11.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_11.style.backgroundColor = '#F3F3F3';
    }
    else {
        crc1_11.style.backgroundColor = '#F3F3F3';
        crc2_11.style.backgroundColor = '#F3F3F3';
    }

    if (mob_1[4] < mob_2[4]) {
        crc1_12.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_12.style.backgroundColor = '#F3F3F3';
    }
    else if (mob_1[4] > mob_2[4]) {
        crc2_12.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_12.style.backgroundColor = '#F3F3F3';
    }
    else {
        crc1_12.style.backgroundColor = '#F3F3F3';
        crc2_12.style.backgroundColor = '#F3F3F3';
    }

    if (arm_1 > arm_2) {
        crc1_13.style.backgroundColor = 'rgb(108, 206, 108)';
        crc2_13.style.backgroundColor = '#F3F3F3';
    }
    else if (arm_1 < arm_2) {
        crc2_13.style.backgroundColor = 'rgb(108, 206, 108)';
        crc1_13.style.backgroundColor = '#F3F3F3';
    }
    else {
        crc1_13.style.backgroundColor = '#F3F3F3';
        crc2_13.style.backgroundColor = '#F3F3F3';
    }
}

function fillTd(tank) {
    // Получаем нужные данные
    let key = tank['key']
    let img = tank['images_url']
    let name = tank['nametank']
    let hull = tank['hull_armor'].trim().match(regex)
    let turret = tank['turret_armor'].trim().match(regex)
    let c = tank['team'];
    let mob = tank['mobility'].trim().match(regex)
    let arm = tank['armament'];

    if (key == 1) {
        crc1_img.innerHTML = `<img src="${img}" alt="Советский танк">`;
        crc1_0.innerText = name;
        crc1_1.innerText = hull[0] + " мм";
        crc1_2.innerText = hull[1] + " мм";
        crc1_3.innerText = hull[2] + " мм";
        crc1_5.innerText = turret[0] + " мм";
        crc1_4.innerText = turret[1] + " мм";
        crc1_6.innerText = turret[2] + " мм";
        crc1_7.innerText = c;
        crc1_8.innerText = mob[0] + " км/ч";
        crc1_9.innerText = mob[1] + " км/ч";
        crc1_10.innerText = mob[2] + " л.с./т";
        crc1_11.innerText = mob[3] + " л.с.";
        crc1_12.innerText = mob[4] + " т";
        crc1_13.innerText = arm + " мм";
    } else {
        crc2_img.innerHTML = `<img src="${img}" alt="Советский танк">`;
        crc2_0.innerText = name;
        crc2_1.innerText = hull[0] + " мм";
        crc2_2.innerText = hull[1] + " мм";
        crc2_3.innerText = hull[2] + " мм";
        crc2_5.innerText = turret[0] + " мм";
        crc2_4.innerText = turret[1] + " мм";
        crc2_6.innerText = turret[2] + " мм";
        crc2_7.innerText = c;
        crc2_8.innerText = mob[0] + " км/ч";
        crc2_9.innerText = mob[1] + " км/ч";
        crc2_10.innerText = mob[2] + " л.с./т";
        crc2_11.innerText = mob[3] + " л.с.";
        crc2_12.innerText = mob[4] + " т";
        crc2_13.innerText = arm + " мм";
    }

    const savedT1 = sessionStorage.getItem('t1');
    const savedT2 = sessionStorage.getItem('t2');

    var t1 = savedT1 ? JSON.parse(savedT1) : null;
    var t2 = savedT2 ? JSON.parse(savedT2) : null;

    if (t1 && t2) {
        compareTanks(t1, t2);
    }
}

function getInfoName(nametank) {
    /*
        Функция получает название танка.
        По этому названию нужно получить данные из базы со всеми полями(id, nametank, images_url и т.д.).
        айдишники должны в базе идти так (1, 2, 3, 4, ...)
        Эти данные нужно представить в виде объекта JavaScript (type == object), в котором будут все поля из база.
        Пример такого объекта:
        var tank = {
            "id": 1,
            "nametank": "БТ-5",
            "description": "...",
            "images_url": "https://static.encyclopedia.warthunder.com/images/ussr_bt_5.png",
            "hull_armor": "13 / 15 / 13",
            "turret_armor": "20 / 15 / 15",
            "team": "3 человека",
            "mobility": " 51 / 10 / 34,5 / 400 / 11,6",
            "armament": "67"
        };

        далее этот объект нужно вернуть из функции. Если не удалось найти танк с таким названием, возвращаем null

        также в функциях showPrevTank1(), showNextTank1(), showPrevTank2(), showNextTank2()
        нужно поддкорректировать айдишники
    */
}

function getInfoID(id) {
    /*
        Функция получает айдишник танка.
        По этому айдишнику нужно получить данные из базы со всеми полями(id, nametank, images_url и т.д.).
        айдишники должны в базе идти так (1, 2, 3, 4, ...)
        Эти данные нужно представить в виде объекта JavaScript (type == object), в котором будут все поля из база.
        Пример такого объекта:
        var tank = {
            "id": 1,
            "nametank": "БТ-5",
            "description": "...",
            "images_url": "https://static.encyclopedia.warthunder.com/images/ussr_bt_5.png",
            "hull_armor": "13 / 15 / 13",
            "turret_armor": "20 / 15 / 15",
            "team": "3 человека",
            "mobility": " 51 / 10 / 34,5 / 400 / 11,6",
            "armament": "67"
        };

        далее этот объект нужно вернуть из функции. Если не удалось найти танк с таким айдишником, возвращаем null

        также в функциях showPrevTank1(), showNextTank1(), showPrevTank2(), showNextTank2()
        нужно поддкорректировать айдишники
    */
}

function showPrevTank1() {
    var id;
    var savedT1 = sessionStorage.getItem('t1');
    var t1 = savedT1 ? JSON.parse(savedT1) : null;
    if (t1) {
        id = t1['id'];
        id = id - 1;
        if (id == 0) {
            id = 3; // Здесь вместо 3 надо написать самый старший id в базе данных
        }
    }
    else {
        id = 1;
    }

    var dataToSend = getInfoID(id);
    if (dataToSend) {
        dataToSend['key'] = 1;
        sessionStorage.setItem('t1', JSON.stringify(dataToSend));
    }

    savedT1 = sessionStorage.getItem('t1');
    t1 = savedT1 ? JSON.parse(savedT1) : null;
    fillTd(t1);
}

function showNextTank1() {
    var id;
    var savedT1 = sessionStorage.getItem('t1');
    var t1 = savedT1 ? JSON.parse(savedT1) : null;
    if (t1) {
        id = t1['id'];
        id = id + 1;
        if (id == 4) { // Здесь вместо 6 надо написать самый старший id + 1 в базе данных
            id = 1;
        }
    }
    else {
        id = 1;
    }

    var dataToSend = getInfoID(id);
    if (dataToSend) {
        dataToSend['key'] = 1;
        sessionStorage.setItem('t1', JSON.stringify(dataToSend));
    }

    savedT1 = sessionStorage.getItem('t1');
    t1 = savedT1 ? JSON.parse(savedT1) : null;
    fillTd(t1);
}

function showPrevTank2() {
    var id;
    var savedT2 = sessionStorage.getItem('t2');
    var t2 = savedT2 ? JSON.parse(savedT2) : null;
    if (t2) {
        id = t2['id'];
        id = id - 1;
        if (id == 0) {
            id = 3; // Здесь вместо 5 надо написать самый старший id в базе данных
        }
    }
    else {
        id = 1;
    }

    var dataToSend = getInfoID(id);
    if (dataToSend) {
        dataToSend['key'] = 2;
        sessionStorage.setItem('t2', JSON.stringify(dataToSend));
    }

    savedT2 = sessionStorage.getItem('t2');
    t2 = savedT2 ? JSON.parse(savedT2) : null;
    fillTd(t2);
}


function showNextTank2() {
    var id;
    var savedT2 = sessionStorage.getItem('t2');
    var t2 = savedT2 ? JSON.parse(savedT2) : null;
    if (t2) {
        id = t2['id'];
        id = id + 1;
        if (id == 4) { // Здесь вместо 6 надо написать самый старший id + 1 в базе данных
            id = 1;
        }
    }
    else {
        id = 1;
    }

    var dataToSend = getInfoID(id);
    if (dataToSend) {
        dataToSend['key'] = 2;
        sessionStorage.setItem('t2', JSON.stringify(dataToSend));
    }

    savedT2 = sessionStorage.getItem('t2');
    t2 = savedT2 ? JSON.parse(savedT2) : null;
    fillTd(t2);
}

const form1 = document.getElementById('search1');

// Первая форма
form1.addEventListener('submit', function (event) {
    event.preventDefault(); // Отключаем стандартную отправк

    const tank1 = document.getElementById('searchQuery1').value;

    this.querySelector('input[type="text"]').value = '';

    var dataToSend = getInfoName(tank1);
    if (dataToSend) {
        dataToSend['key'] = 1;
        sessionStorage.setItem('t1', JSON.stringify(dataToSend));
    }

    var savedT1 = sessionStorage.getItem('t1');
    var t1 = savedT1 ? JSON.parse(savedT1) : null;
    fillTd(t1);
});

const form2 = document.getElementById('search2');

// Вторая форма
form2.addEventListener('submit', function (event) {
    event.preventDefault(); // Отключаем стандартную отправк
    const tank2 = document.getElementById('searchQuery2').value;

    var dataToSend = getInfoName(tank2);

    this.querySelector('input[type="text"]').value = '';

    if (dataToSend) {
        dataToSend['key'] = 2;
        sessionStorage.setItem('t2', JSON.stringify(dataToSend));
    }

    var savedT2 = sessionStorage.getItem('t2');
    var t2 = savedT2 ? JSON.parse(savedT2) : null;
    fillTd(t2);
});