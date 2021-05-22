export default  class Maps{
    constructor() {
        this.showMap = this.showMap.bind(this);
        this.addMapEvent = this.addMapEvent.bind(this);
        this.addPlacemarksEvents = this.addPlacemarksEvents.bind(this);
        this.getAdress = this.getAdress.bind(this);
        this.createPlacemark = this.createPlacemark.bind(this);
        this.getCoords = this.getCoords.bind(this);
    }
    showMap() {
        return new Promise(resolve =>{
            ymaps.ready(() =>{
                this.Map = new ymaps.Map("map", {
                    center: [55.76, 37.64],
                    controls: ['searchControl'],
                    zoom: 14
                });
                let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
                    // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
                    '<div class=balloon>' +
                    '<h3 class=balloon_header>{{ properties.balloonContentHeader|raw }}</h3>' +
                    '<a href="#" class=balloon_link>{{ properties.balloonContentLink|raw }}</a>' +
                    '<div class=balloon_body>{{ properties.balloonContentBody|raw }}</div>' +
                    '<div class=balloon_footer>{{ properties.balloonContentFooter|raw }}</div>' +
                    '</div>'
                );
                this.Map.cursors.push('arrow');
                this.clusterer = new ymaps.Clusterer({
                    clusterDisableClickZoom: true,
                    clusterOpenBalloonOnClick: true,
                    preset: 'islands#redClusterIcons',
                    clusterBalloonContentLayout: 'cluster#balloonCarousel',
                    clusterBalloonItemContentLayout: customItemContentLayout,
                    clusterBalloonPanelMaxMapArea: 0,

                    clusterBalloonContentLayoutWidth: 300,
                    clusterBalloonContentLayoutHeight: 130,

                    clusterBalloonPagerSize: 5,


                });

                this.Map.geoObjects.add(this.clusterer);
                resolve()
            })
            })



    }
    addMapEvent(event, func) {
       this.Map.events.add(event, func)
    }
    addPlacemarksEvents(event, func) {
        this.Map.geoObjects.events.add(event, func);
    }
    getAdress(coords){
        return ymaps.geocode(coords)
    }
    getCoords(address){
        return ymaps.geocode(address)
        .then(result => {
            return result.geoObjects.get(0).geometry._coordinates
        })
    }
    createPlacemark(coords, {date, place, content, address}){
        console.log(coords,content, 'coordsб ',coords);
        let placemark =new ymaps.Placemark(coords, {
            balloonContentHeader: place,
            balloonContentLink: address,
            balloonContentBody: content,
            balloonContentFooter: date
        }, {
            preset: 'islands#redDotIcon',
            openBalloonOnClick: false
        });
        this.clusterer.add(placemark);
        this.Map.geoObjects.add(this.clusterer);

    }
}