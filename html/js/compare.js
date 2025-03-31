// Очищаем sessionStorage при загрузке страницы
window.addEventListener('load', function () {
    sessionStorage.clear();
});

// Регулярное выражение
const regex = /\d+(?:[.,]\d+)?/g;

// Кэшируем элементы DOM
const elements = {
    crc1: {},
    crc2: {},
};

// Инициализация DOM элементов. Пары ключ-значение(номер элемента(индекс)-элемент)
function initElements() {
    for (let i = 0; i <= 13; i++) {
        elements.crc1[i] = document.getElementById(`crc1-${i}`);
        elements.crc2[i] = document.getElementById(`crc2-${i}`);
    }
    elements.crc1.img = document.getElementById('crc1-img');
    elements.crc2.img = document.getElementById('crc2-img');
}

// Вызываем инициализатор
initElements();
async function fetchData(item) {
    try {
      var value = "/api/search.php?"+item;
        const response = await fetch(value);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json(); // Пытаемся распарсить JSON
        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        return []; // Возвращаем пустой массив, если произошла ошибка
    }
}

// Определяем функцию searchFetchData

// Асинхронная функция сравнения танков. Красит нужные элементы таблицы в зеленый цвет
async function compareTanks(t1, t2) {
    try {
        // Анонимные функции-парсеры брони и подвижности
        const parseArmor = (armor) => armor.trim().match(regex).map(num => parseFloat(num.replace(',', '.')));
        const parseMobility = (mobility) => mobility.trim().match(regex).map(num => parseFloat(num.replace(',', '.')));

        // Параллельное выполнение парсеров
        const [hull_1, hull_2] = await Promise.all([
            parseArmor(t1.hull_armor),
            parseArmor(t2.hull_armor)
        ]);

        // Параллельное выполнение парсеров
        const [turret_1, turret_2] = await Promise.all([
            parseArmor(t1.tower_armor),
            parseArmor(t2.tower_armor)
        ]);

        const c_1 = parseInt(t1.team.replace(/[^0-9]/g, ''));
        const c_2 = parseInt(t2.team.replace(/[^0-9]/g, ''));

        // Параллельное выполнение парсеров
        const [mob_1, mob_2] = await Promise.all([
            parseMobility(t1.mobility),
            parseMobility(t2.mobility)
        ]);

        const arm_1 = parseInt(t1.armament);
        const arm_2 = parseInt(t2.armament);

        // Функция для сравнения значений. Принимает индекс элементов, значения элементов
        const compareValues = (index, val1, val2, reverse = false) => {
            // Получаем доступ к элементам по индексу
            const style1 = elements.crc1[index].style;
            const style2 = elements.crc2[index].style;

            // Сравниваем
            if ((!reverse && val1 > val2) || (reverse && val1 < val2)) {
                style1.backgroundColor = 'rgb(108, 206, 108)';
                style2.backgroundColor = '#F3F3F3';
            } else if ((!reverse && val1 < val2) || (reverse && val1 > val2)) {
                style2.backgroundColor = 'rgb(108, 206, 108)';
                style1.backgroundColor = '#F3F3F3';
            } else {
                style1.backgroundColor = '#F3F3F3';
                style2.backgroundColor = '#F3F3F3';
            }
        };

        // Сравнение характеристик
        compareValues(1, hull_1[0], hull_2[0]);
        compareValues(2, hull_1[1], hull_2[1]);
        compareValues(3, hull_1[2], hull_2[2]);
        compareValues(4, turret_1[0], turret_2[0]);
        compareValues(5, turret_1[1], turret_2[1]);
        compareValues(6, turret_1[2], turret_2[2]);
        compareValues(7, c_1, c_2);
        compareValues(8, mob_1[0], mob_2[0]);
        compareValues(9, mob_1[1], mob_2[1]);
        compareValues(10, mob_1[2], mob_2[2]);
        compareValues(11, mob_1[3], mob_2[3]);
        compareValues(12, mob_1[4], mob_2[4], true); // Обратное сравнение для веса
        compareValues(13, arm_1, arm_2);

    } catch (error) {
        console.error('Ошибка при сравнении танков:', error);
    }
}

// Асинхронная функция заполнения данных
async function fillTd(tank) {
    if (!tank) return;

    try {
        // Получаем доступ к нужной таблице с танком
        const key = tank.key;
        const target = key === 1 ? elements.crc1 : elements.crc2;

        // Заполняем
        target.img.innerHTML = `<img src="${tank.images_url}" alt="Советский танк">`;
        target[0].textContent = tank.nametank;

        const hull = tank.hull_armor.trim().match(regex);
        const turret = tank.tower_armor.trim().match(regex);
        const mob = tank.mobility.trim().match(regex);

        target[1].textContent = `${hull[0]} мм`;
        target[2].textContent = `${hull[1]} мм`;
        target[3].textContent = `${hull[2]} мм`;
        target[4].textContent = `${turret[0]} мм`;
        target[5].textContent = `${turret[1]} мм`;
        target[6].textContent = `${turret[2]} мм`;
        target[7].textContent = tank.team;
        target[8].textContent = `${mob[0]} км/ч`;
        target[9].textContent = `${mob[1]} км/ч`;
        target[10].textContent = `${mob[2]} л.с./т`;
        target[11].textContent = `${mob[3]} л.с.`;
        target[12].textContent = `${mob[4]} т`;
        target[13].textContent = `${tank.armament} мм`;

        // Параллельно получаем доступ к данным танков
        const [savedT1, savedT2] = await Promise.all([
            getSessionItem('t1'),
            getSessionItem('t2')
        ]);

        // Если на странице отображается два танка, то выполняем сравнение
        if (savedT1 && savedT2) {
            await compareTanks(savedT1, savedT2);
        }
    } catch (error) {
        console.error('Ошибка при заполнении данных:', error);
    }
}

// Вспомогательные функции для работы с sessionStorage
async function getSessionItem(key) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

async function setSessionItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// Асинхронные функции для работы с данными
async function getInfoName(nametank) {
  const data = await fetchData(`nametank=${nametank}`);
 
  return data[0];
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
            "tower_armor": "20 / 15 / 15",
            "team": "3 человека",
            "mobility": " 51 / 10 / 34,5 / 400 / 11,6",
            "armament": "67"
        };

        далее этот объект нужно вернуть из функции. Если не удалось найти танк с таким названием, возвращаем null

        также в функции navigateTank() нужно подкорректировать айдишники
    */
}

async function getInfoID(id) {
  let data = await fetchData(`id=${id}`);

  return data[0];
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
            "tower_armor": "20 / 15 / 15",
            "team": "3 человека",
            "mobility": " 51 / 10 / 34,5 / 400 / 11,6",
            "armament": "67"
        };

        далее этот объект нужно вернуть из функции. Если не удалось найти танк с таким айдишником, возвращаем null

        также в функции navigateTank() нужно подкорректировать айдишники
    */
}

// Асинхронная функция вычисления нужного id танка
async function navigateTank(key, direction) {
    try {
        const storageKey = `t${key}`;
        const currentTank = await getSessionItem(storageKey);

        // Вычисляем id
        let newId;
        if (currentTank) {
            newId = currentTank.id + (direction === 'next' ? 1 : -1);
            if (newId > 87) newId = 1; // Здесь 3 нужно заменить на максимальный ID из базы
            if (newId < 1) newId = 87; // Здесь 3 нужно заменить на максимальный ID из базы
        } else {
            newId = 1;
        }

        // Получаем данные танка по вычисленному id
        const dataToSend = await getInfoID(newId);
        if (dataToSend) {
            dataToSend.key = key;
            await setSessionItem(storageKey, dataToSend);
            await fillTd(dataToSend);
        }
    } catch (error) {
        console.error('Ошибка при нажатии на стрелку');
    }
}

// Обработчики стрелочек
async function showPrevTank1() { await navigateTank(1, 'prev'); }
async function showNextTank1() { await navigateTank(1, 'next'); }
async function showPrevTank2() { await navigateTank(2, 'prev'); }
async function showNextTank2() { await navigateTank(2, 'next'); }

// Обработчики форм
async function setupFormHandlers() {
    const form1 = document.getElementById('search1');
    const form2 = document.getElementById('search2');

    // Обработчик для первой формы
    form1.addEventListener('submit', async (event) => {
        event.preventDefault(); // Отключаем стандартную отправку
        const tankName = document.getElementById('searchQuery1').value; // Получаем данные из формы
        form1.reset(); // Очищаем форму

        // Получаем данные танка по его названию
        const dataToSend = await getInfoName(tankName);
        if (dataToSend) {
            dataToSend.key = 1;
            await setSessionItem('t1', dataToSend);
            await fillTd(dataToSend);
        } else {
            alert('Танк не найден. Попробуйте ввести по другому');
        }
    });

    // Обработчик для второй формы
    form2.addEventListener('submit', async (event) => {
        event.preventDefault(); // Отключаем стандартную отправку
        const tankName = document.getElementById('searchQuery2').value; // Получаем данные из формы
        form2.reset(); // Очищаем форму

        // Получаем данные танка по его названию
        const dataToSend = await getInfoName(tankName);
        if (dataToSend) {
            dataToSend.key = 2;
            await setSessionItem('t2', dataToSend);
            await fillTd(dataToSend);
        } else {
            alert('Танк не найден. Попробуйте ввести по другому');
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', async () => {
    await setupFormHandlers();

    // Загрузка начальных данных, если есть в sessionStorage
    const [t1, t2] = await Promise.all([
        getSessionItem('t1'),
        getSessionItem('t2')
    ]);

    if (t1) await fillTd(t1);
    if (t2) await fillTd(t2);
});
