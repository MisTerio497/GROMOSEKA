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
async function getInfoName(nametank) {
  const data = await fetchData(`nametank=${nametank}`);
  
  return data;
}
async function getInfoID(id) {
  let data = await fetchData(`id=${id}`);
  return data;
}

async function run(){
  let a = await getInfoID(6);
  let b = await getInfoName("Т-26");
  console.log(b[0]);
} run();
