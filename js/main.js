


$(function () {



    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });

    /* Прокручивает страницу вверх при нажатии на кнопку */
    $(window).scroll(function () {
        var height = $(window).scrollTop();
        if (height > 100) {
            $('#back2Top').fadeIn();
        } else {
            $('#back2Top').fadeOut();
        }
    });
    $(document).ready(function () {
        $("#back2Top").click(function (event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });

    });


    $(document).on("click", ".menu__item-link", function (e) {
        e.preventDefault();
        var id = $(this).attr("href");
        var top = $(id).offset().top; // получаем координаты блока
        $("body, html").animate({ scrollTop: top - 70 }, 1000); // плавно переходим к блоку
    });

    $(window).on('resize load', function () {
        appendBlocks('.header__lokation', 0, 996, '.menu__list');
        appendBlocks('.header__lokation', 996, 0, '.header__inner');
        appendBlocks('.header__box', 0, 632, '.menu__list');
        appendBlocks('.header__box', 632, 0, '.header__inner');
        appendBlocks(' .intro__img-box-info', 0, 996, '.intro__box');
        appendBlocks(' .intro__img-box-info', 996, 0, 'intro__inner');

    });

    function appendBlocks(block, windowMin, windowMax, appendTo) {
        var exists = $(appendTo).find(block)

        if (!exists.length) {
            if (windowMax == 0) {
                if ($(window).width() > windowMin) {
                    $(block).appendTo($(appendTo));
                }
            } else {
                if ($(window).width() > windowMin && $(window).width() < windowMax) {
                    $(block).appendTo($(appendTo));
                }
            }
        }
    }
    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 0 && scrolled > scrollPrev) {
            header.addClass('out');
        } else {
            header.removeClass('out');
        }
        scrollPrev = scrolled;
    });



    $('.mobal-menu,.menu__item-link').on('click', function () {
        $('.mobal-menu').toggleClass('active');
        $('.menu__list').toggleClass('active');
        $('body').toggleClass('active');

    })
    $(document).on("click", function (e) {
        // отслеживаем событие клика по веб-документу
        var block = $(".menu__list,.mobal-menu"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
        if (
            !block.is(e.target) && // проверка условия если клик был не по нашему блоку
            block.has(e.target).length === 0
        ) {
            // проверка условия если клик не по его дочерним элементам

            $(".menu__list").removeClass("active");
            $(".mobal-menu").removeClass("active");
            $("body").removeClass("active");

        }
    });

    // ВАЛИДАЦИЯ  ФОРМЫ==============================

    $('.intro__btn').on("click", function () {
        $('.modal__form-form').addClass('is-open');
        $('body').addClass('losk');

    });
    $('.modal__close').on("click", function () {
        $('.modal').removeClass('is-open');
        $('body').removeClass('losk');
        $("form label.error").remove();
        $("form input.error").removeClass("error");
        $("form input.valid").removeClass("valid");


    });

    $("form").each(
        function () {
            $(this).validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2,
                    },

                    email: {
                        required: true,
                        email: true,
                    },
                    phone: {
                        required: true,
                    },
                    date: {
                        required: true,
                    },
                    time: {
                        required: true,
                    }
                },
                messages: {
                    date: {
                        required: "",
                        minlength: "",
                    },
                    time: {
                        required: "",
                        minlength: "",
                    },
                    name: {
                        required: "Укажите ваше имя",
                        minlength: jQuery.validator.format(
                            "Ваше  имя  должно  быть  не  менее  2х символов"
                        ),
                    },
                    email: {
                        required:
                            "Нам нужен ваш адрес электронной почты, чтобы с вами связаться",
                        email:
                            "Ваш адрес электронной почты должен быть в формате name@domain.com",
                    },
                    phone: {
                        required: "Введите ваш номер телефона.",
                        minlength: jQuery.validator.addMethod("input-tel", function (phone_number, element) {
                            phone_number = phone_number.replace(/\s+/g, "");
                            return this.optional(element) || phone_number.length > 9 &&
                                phone_number.match(/^((\+7|7|8)+([0-9]){10})$/);
                        }, "Введите корректный номер телефона.")
                    },
                },
                submitHandler: function (form) {
                    $(".appointment__form, .form-tel, .services__form").removeClass(
                        "is-active"
                    );
                    $('.modal__form-form').removeClass('is-open');
                    $('.modal-alert').addClass('is-open');
                    $('body').addClass('losk');
                    // очищаем все данные текстовых полей, кроме кнопок
                    $("form input").not(":button, :submit").val("");
                    $("form input.valid").removeClass("valid");
                },
            });
        }
    );



    $(".modal__overlay").on("click", function (e) {
        // отслеживаем событие клика по веб-документу
        var block = $(".modal__container"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
        if (
            !block.is(e.target) && // проверка условия если клик был не по нашему блоку
            block.has(e.target).length === 0
        ) {
            // проверка условия если клик не по его дочерним элементам
            $('.modal').removeClass('is-open');
            $('body').removeClass('losk');
            $("form label.error").remove();
            $("form input.error").removeClass("error");
            $("form input.valid").removeClass("valid");

        }
    });
    $("body").on("click", function (e) {
        // отслеживаем событие клика по веб-документу
        var block = $(".contacts__box-form,.modal__container"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
        if (
            !block.is(e.target) && // проверка условия если клик был не по нашему блоку
            block.has(e.target).length === 0
        ) {
            // проверка условия если клик не по его дочерним элементам         
            $("form label.error").remove();
            $("form input.error").removeClass("error");
            $("form input.valid").removeClass("valid");
            $("form input").not(":button, :submit").val("");

        }
    });


    $('.modal__close-slider').on("click", function () {
        $('.modal-slider').addClass('is-open');
        $('body').addClass('losk');
        $('.modal-slider__inner').slick('setPosition')
    });

    $(".modal__overlay-alert").on("click", function (e) {
        // отслеживаем событие клика по веб-документу
        var block = $(".modal__container-alert"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
        if (
            !block.is(e.target) && // проверка условия если клик был не по нашему блоку
            block.has(e.target).length === 0
        ) {
            // проверка условия если клик не по его дочерним элементам
            $('.modal-slider').addClass('is-open');
            $('.modal-alert').removeClass('is-open');
            $('.modal-slider__inner').slick('setPosition')
        }
    });



    // =========================================

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline = new Date(Date.parse(new Date()) + 6 * 24 * 60 * 1000);
    initializeClock('clockdiv', deadline);

    $('.feedback__inner').slick({
        prevArrow: '<button type ="button" class="slick-prev feedback__slider-btn"> <img src="images/feedback/prev-slider.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next feedback__slider-btn"> <img src="images/feedback/next-slider.svg" alt=""></button>',
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        responsive: [
            {
                breakpoint: 1209,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                }
            },

            {
                breakpoint: 721,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 487,
                settings: {
                    slidesToShow: 1.3,
                    slidesToScroll: 1,

                }
            },
        ]
    });


    $('.completed__inner').slick({
        prevArrow: '<button type ="button" class="slick-prev completed__slider-btn"> <img src="images/feedback/prev-slider.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next completed__slider-btn"> <img src="images/feedback/next-slider.svg" alt=""></button>',
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        responsive: [
            {
                breakpoint: 681,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 487,
                settings: {
                    slidesToShow: 1.3,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
        ]
    });

    $('.presen__inner').slick({
        prevArrow: '<button type ="button" class="slick-prev presen__slider-btn"> <img src="images/feedback/prev-slider.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next presen__slider-btn"> <img src="images/feedback/next-slider.svg" alt=""></button>',
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        responsive: [
            {
                breakpoint: 1017,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                }
            },
            {
                breakpoint: 771,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 587,
                settings: {
                    slidesToShow: 1.3,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
        ]
    });


    $('.presen__bottom-wrapper').slick({
        prevArrow: '<button type ="button" class="slick-prev presen__bottom-btn"> <img src="images/feedback/prev-slider.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next presen__bottom-btn"> <img src="images/feedback/next-slider.svg" alt=""></button>',
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,

    });


    $('.modal-slider__inner').slick({
        prevArrow: '<button type ="button" class="slick-prev modal-slider__btn"> <img src="images/feedback/prev-slider.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next modal-slider__btn"> <img src="images/feedback/next-slider.svg" alt=""></button>',
        infinite: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
    });

    $('.contacts__slider').slick({
        prevArrow: '<button type ="button" class="slick-prev presen__bottom-btn"> <img src="images/feedback/prev-slider.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next presen__bottom-btn"> <img src="images/feedback/next-slider.svg" alt=""></button>',
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        responsive: [
            {
                breakpoint: 553,
                settings: {
                    arrows: false,
                }
            },
        ]
    });

    // ===================================//

    $(".feedback__btn").on("click", function () {
        $(this).hide();
        $(this).next('.feedback__item video').each(function () {
            $(this)[0].play();
            $(this).next('picture').hide();

        });
    });
    

    $(".feedback__item video").on("click", function () {
        $(this)[0].pause();
        $(".feedback__btn").show();
    });

    $(".feedback__item video").on("ended", function () {
        $(this).next('.feedback__item picture').show();
        $('.feedback__btn').show();
        // $(this).reload();
    });

    var videos = document.querySelectorAll(".feedback__item video");
    for (var i = 0; i < videos.length; i++) {
        videos[i].onplay = function (e) {
            for (var j = 0; j < videos.length; j++) {
                if (videos[j] != this) videos[j].pause()
            }
        };
    }

    // =======================video contacts=======================//

    $('.contacts__video-btn').on('click', function () {
        $('.contacts__video-img').hide();
        $(this).hide();
    });

    $('.contacts__video-btn').parent().on('click', function () {

        if ($(this).children("#contacts__video-js").get(0).paused) {
            $(this).children("#contacts__video-js").get(0).play();
            $('.contacts__video').removeClass('btn-pause-active');
            $('.contacts__video-img').hide();


        } else {
            $(this).children("#contacts__video-js").get(0).pause();
            $('.contacts__video').addClass('btn-pause-active');
            $('.contacts__video-img').show();
        }
    });
    $("#contacts__video-js").on("ended", function () {
        $('.contacts__video-img').show();
        $('.contacts__video-btn').show();

    });


});

