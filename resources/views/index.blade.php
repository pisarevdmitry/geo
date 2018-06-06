<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous">
  <link rel="stylesheet" href="dist/styles.css">
  <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.10/handlebars.js"></script>
  <title>ГЕООТЗЫВ</title>
 </head>
<body>
    <div class="wrapper" id="map">
        <div class="logo">
            <svg class="logo__image" >
                <use xlink:href="dist/images/group-2.svg#logo"></use>
            </svg>
        </div>
        <div class="pop-up hidden">
            <div class="pop-up-header">
                <i class="fas fa-map-marker-alt pop-up-header__marker"></i>
                <span class="pop-up-header__text">Невский пр., 78, Санкт-Петербург, 191025</span>
                <button class="btn btn-small btn-cross btn-white pop-up-header__btn "></button>
            </div>
            <ul class="pop-up-comments-list">
                <li class="comment">
                    <div class="comment__info">
                        <span class="comment__user-name">svetlana</span>
                        <span class="comment__place">Шоколадница</span>
                        <span class="comment__date">13.12.2015</span>
                    </div>
                    <p class="comment__text">Очень хорошее место!</p>
                </li>
                <li class="comment">
                    <div class="comment__info">
                        <span class="comment__user-name">Сергей Мелюков</span>
                        <span class="comment__place">Красный куб </span>
                        <span class="comment__date">12.12.2015</span>
                    </div>
                    <p class="comment__text">Ужасное место! Кругом зомби!!!!</p>
                </li>
            </ul>
            <div class="feedback">
                <span class="feedback__title">ВАШ ОТЗЫВ</span>
                <form class="feedback-form">
                    <input class="feedback-form__input" type="text"  title="name" placeholder="Ваше имя" name="author">
                    <input class="feedback-form__input" type="text"  title="address" placeholder="Укажите место" name="place">
                    <textarea class="feedback-form__textarea" title="comment" name="content"></textarea>
                    <div class="message"></div>
                    <button type="submit" class="btn btn-submit">Добавить</button>

                </form>
            </div>
        </div>

    </div>
<script src="dist/build.js"></script>
</body>
</html>
