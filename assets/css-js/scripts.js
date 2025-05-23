$(function(){

	$(document).on('click','a[href^="#"]',function(e){
		e.preventDefault();
	});

	$('.faq-frame').click(function(){
		$(this).parent().toggleClass('active');
		$(this).next('.answer').slideToggle(300);
	});

	function setBoxH(){
		$('.vid-cta .small-text').each(function(){
			var boxH = $(this).height();
			$(this).parents('.text').attr('style','--boxH:'+boxH+'px;');
		});
	}

	setBoxH();

	$(window).resize(function(){
		setBoxH();
	});


    $('.vid [data-vid]').click(function(){
        $('modal').addClass('active');
        var vidNum = $(this).attr('data-vid');

        video = document.getElementById('video-'+vidNum);
        $(video).addClass('active')
        video.play();
    });


    $('.close').click(function(){
        $('modal,[data-vid]').removeClass('active');
        video.pause();
        video.currentTime = 0;
    });


    $('.menu-trigger').on('click',function(){
        $('body').toggleClass('menu-open');
        $(this).toggleClass('is-active');
        if($('body').hasClass('menu-open')){
        	$('body,html').scrollTop(0);
            $('html,body').attr('style','width:'+document.body.clientWidth+'px');
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.position = 'fixed';
        }else{
            $('html').removeAttr('style');
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    });

	if(location.hash){
		var target = location.hash;
		var targetOffset = $(target).offset().top;
		$('body,html').stop().animate({scrollTop:targetOffset},500);
	}

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $('.menu a').click(function(){
        $('body').removeClass('menu-open');
        $('.menu-trigger').removeClass('is-active');
        $('html').removeAttr('style');
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    })

});