import Map from './Maps'
import View from './View'
import Model from './Model';
import adressTemplate from '../tempates/adressTemplate';
import postsTempate from '../tempates/postsTemplate'
export default class App {
    constructor() {
        this.YMap = new Map;
        this.View = new View;
        this.Model = new Model;
        this.popup = document.querySelector('.pop-up');
        this.popupHeader = document.querySelector('.pop-up-header');
        this.width = window.innerWidth < 600 ? 600 : window.innerWidth;
        this.addPost = document.querySelector('.feedback-form');
        this.onMapClick = this.onMapClick.bind(this);
        this.onPlacemarkClick = this.onPlacemarkClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClusterClick = this.onClusterClick.bind(this);
        this.initListener();
        this.init();
    }
    // получение данных из базы данных и инициализация карты
    async init() {
        let res = await this.Model.getPosts();

        await this.YMap.showMap();
        this.data = await res.json();
        this.YMap.addMapEvent('click', this.onMapClick);
        this.YMap.addPlacemarksEvents('click', this.onPlacemarkClick);
        this.data.forEach(item => {
            this.renderPlacemarks(item.address,item)
        })
    }
    // инициализация  обших эвентов
    initListener() {
        this.popupHeader.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') this.popup.classList.add('hidden')
        });
        this.addPost.addEventListener('submit', this.onSubmit);
        document.addEventListener('click', this.onClusterClick);
        window.addEventListener("resize", () => this.width = window.innerWidth < 600 ? 600 : window.innerWidth);
    }
     // обработчик при клике на карту
     onMapClick(e) {
        this.showPopup(e)
    }
    // обработчик при клике на маркер
     onPlacemarkClick(e) {
        if(e.get('target').options._name === 'geoObject'){
           this.showPopup(e, true)
        }
    }
    // обработчик при нажатие в окне кластера
    onClusterClick(e) {
        if(e.target.classList.contains('balloon_link')) {
            e.preventDefault();
            this.popup.style.left = `${this.calaculatePopUp(e.pageX, this.width)}px`;
            let address = e.target.innerText;
            this.View.render(adressTemplate, {address}, this.popupHeader);
            let posts = this.filterData(address);
            this.View.render(postsTempate, {items: posts}, document.querySelector('.pop-up-comments-list'));
            this.popup.classList.remove('hidden')
        }
    }
    // показ всплывабщего окна
   async showPopup(e, placemark){
        let address;
        let coords = e.get('domEvent').originalEvent;

        this.popup.style.left = `${this.calaculatePopUp(coords.pageX, this.width)}px`;
        if(placemark) {
            address = {address: e.get('target').properties._data.balloonContentLink}
        } else{
            let YmapsCoord = e.get('coords');
            let res = await this.YMap.getAdress(YmapsCoord);
            address = {address: res.geoObjects.get(0).properties._data.text};
        }
        this.View.render(adressTemplate, address, this.popupHeader);
        let posts = this.filterData(address.address);
        this.View.render(postsTempate, {items: posts}, document.querySelector('.pop-up-comments-list'));
        this.popup.classList.remove('hidden')
    }
     // расчет места появления
    calaculatePopUp(pageX, width) {
        if(width < 1000 ||pageX >= width / 2) return (width / 2) * 0.2;

        return (width / 2) + (width / 2) * 0.2
    }
     // обработчик для добавления маркера
     onSubmit(e) {
        e.preventDefault();
        let arr = [this.addPost.elements.author, this.addPost.elements.place, this.addPost.elements.content];
        let res = this.validate(arr);

        if (!res) {
            document.querySelector('.message').innerText = 'Заполните все поля';
            return
        }
        document.querySelector('.message').innerText = '';
        let data = new FormData(this.addPost);
        data.append('address', document.querySelector('.pop-up-header__text').innerText);
        this.Model.postData(data)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.querySelector('.message').innerText = data.error;
                    return
                }
                let newData = {address:document.querySelector('.pop-up-header__text').innerText,
                    author: this.addPost.elements.author.value,
                    place: this.addPost.elements.place.value,
                    content: this.addPost.elements.content.value,
                    date :this.setDate()};
                this.data.push(newData);
                this.addPost.reset();
                let posts = this.filterData(document.querySelector('.pop-up-header__text').innerText);
                this.View.render(postsTempate, {items: posts}, document.querySelector('.pop-up-comments-list'));
                this.renderPlacemarks(document.querySelector('.pop-up-header__text').innerText, newData);


            })


    }

    validate(arr) {
        for (let item of arr) {
            if (!item.value) return false
        }
        return true
    }
    // добавление маркера
    renderPlacemarks(address, data) {
        this.YMap.getCoords(address)
            .then(result => {
                let coords = result.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData
                    .InternalToponymInfo.Point.coordinates;
                this.YMap.createPlacemark(coords, data);
            })
    }
    filterData(address){
        return this.data.filter(item => {
            return item.address === address
        })
    }
    setDate() {
        let date = new Date();
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let month = date.getMonth() + 1 < 10 ?`0${date.getMonth() + 1}` : date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

        return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`
    }



}