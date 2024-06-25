const key = "sYbNQaOPiVPAgiomZfU9CbyNU%2FhHGm6U%2FRXSb5zAZyCQDaws66lC61D2sArRM7D5SgsWk0GeCwkbneHTiEuXZQ%3D%3D";
const list = document.querySelector('#list');
const nameInput = document.querySelector('#name');
const citynameInput = document.querySelector('#cityname');
const citymanageSelect = document.querySelector('#citymanage');
const searchButton = document.querySelector('#search');

const searchData = {
    page: '0',
    perPage: '0'
};

nameInput.addEventListener("input", () => {
    searchData.page = nameInput.value;
});

citynameInput.addEventListener("input", () => {
    searchData.perPage = citynameInput.value;
});

searchButton.addEventListener("click", () => {
    let url = `https://api.odcloud.kr/api/15067528/v1/uddi:eb02ec03-6edd-4cb0-88b8-eda22ca55e80?serviceKey=${key}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&page=${searchData.page}&perPage=${searchData.perPage}`;
    console.log(url);
    tourData(url);
});

async function tourData(url) {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();

        console.log(jsonData);

        if (jsonData.resultCode === '10') {
            console.error('API 오류:', jsonData.resultMsg);
            return;
        }
        list.innerHTML = '';

        if (jsonData.data.length > 0) {
            const data = jsonData.data;
            const ul = document.createElement('ul');

            data.forEach(item => {
                const btn = document.createElement('button');
                btn.onclick = () => {
                    const longitude = item.경도;
                    const latitude = item.위도;
                    window.location.href = `map.html?longitude=${longitude}&latitude=${latitude}`;
                };
                btn.textContent = item.정류장명;
                ul.appendChild(btn);
            });

            list.appendChild(ul);
        } else {
            const p = document.createElement('p');
            p.textContent = '검색 결과가 없습니다.';
            list.appendChild(p);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
}