/*!
 * project
 * 
 * 
 * @author 
 * @version 1.0.0
 * copyright 2018. ISC licensed.
 */
/*!
 * project
 *
 *
 * @author
 * @version 1.0.0
 * copyright 2018. ISC licensed.
 */
$(document).ready(function() {
	if ($('.gnb').length) {
		if ($('.gnb > li > ul').hasClass('gnb-dep2')) {
			$('.gnb > li > ul').parent().addClass('has-children');
		}
		gnb();
	}
	if ($('.banner-list').length) {
		bxSlideUi();
	}
	ModalEvent();
	if ($('.tab-lst > li').length) {
		tabbasic();
	}
	if ($('.accordion').length) {
		accordionEvt();
	}

});

$(window).on('scroll', function() {
	var $scrollTop = $(window).scrollTop();
	if ($scrollTop > 0) {
		$('.top-btn-wrap').addClass('fix');
	}
	if ($scrollTop < 60) {
		$('.top-btn-wrap').removeClass('fix');
	}
}).scroll();

$(window).resize(function() {
	gnb();
});


function gnb() {
	$('.gnb > li').removeClass('active');
	var viewportwidth = $(window).width();
	if (viewportwidth > 1023) {
		$('.gnb > li > a').on('mouseover focusin', function() {
			$('.gnb > li').removeClass('active');
			$(this).parent().addClass('active');
		});
		$('.gnb > li > a').on('mouseout focusout', function() {
			$('.gnb > li').removeClass('active');
		});
		$('.gnb-dep2').on('mouseover focusin', function() {
			$(this).parent().addClass('active');
		});
		$('.gnb-dep2').on('mouseout focusout', function() {
			$(this).parent().removeClass('active');
		});
	} else {
		$('.gnb > li > a').off('mouseover');
		$('.gnb > li > a').off('focusin');
		$('.gnb > li > a').off('mouseout');
		$('.gnb > li > a').off('focusout');
		$('.gnb-dep2').off('mouseover');
		$('.gnb-dep2').off('focusin');
		$('.gnb-dep2').off('mouseout');
		$('.gnb-dep2').off('focusout');
		
		$('.gnb > li > a').on('click', function() {
			$('.gnb > li').removeClass('active');
			$(this).parent().addClass('active');
			return false;
		});
		

	}

	$('.mobile-menu-open').on('click', function() {
		$('.header-inbox').addClass('open');
		$('body').css({
			overflow : 'hidden'
		}).bind('touchmove', function(e) {
			e.preventDefault();
		});

	});
	$('.mobile-menu-close').on('click', function() {
		$('.header-inbox').removeClass('open');
		$('body').css({
			overflow : 'inherit'
		}).unbind('touchmove');
	});

}

function tabbasic() {
	var tNum = $('.tab-lst').length;
	for (var i = 0; i < tNum; i++) {
		var ttnum = 'col' + $('.tab-lst').eq(i).find('li').length;
		$('.tab_lst').eq(i).addClass(ttnum);
	}
	$('.tab-lst > li > a').on('click', function() {
		$(this).parent().parent().find('li').removeClass('active');
		$(this).parent().parent().find('a').removeAttr('title');
		$(this).parent().addClass('active');
		$(this).attr('title', 'selected');
		var o = $(this).parent().index();
		$(this).parent().parent().parent().find('.tab-content').removeClass('active');
		$(this).parent().parent().parent().find('.tab-content').eq(o).addClass('active');
		return false;
	});
}

function bxSlideUi() {
	//메인배너
	var mVisualBnr = $('.banner-list').bxSlider({
		// mode: 'fade',
		auto : true,
		autoControls : true,
		touchEnabled : true,
		controls : false,
		pager : true,
		responsive : true,
		autoHover : true,

		onSliderLoad : function(currentIndex) {
			$('.banner-list .banner-list-item').find('a').attr('tabindex', -1);
			$('.banner-list .banner-list-item').not('.bx-clone').eq(currentIndex).find('a').attr('tabindex', 0);
		},
		onSlideBefore : function($slideElement, oldIndex, newIndex) {
			$('.banner-list .banner-list-item').find('a').attr('tabindex', -1);
			$('.banner-list .banner-list-item').not('.bx-clone').eq(newIndex).find('a').attr('tabindex', 0);
		}
	});

	var neswSlide = $('.notice-list').bxSlider({
		mode : 'vertical',
		auto : true,
		autoControls : true,
		pagerType : 'short',
		touchEnabled : false,
		speed : 500,
		autoHover : true,
		pager : false
	});

	//메인베너 컨트롤 버튼
	$('.bx-start').hide();
	$('.bx-start').on('click', function() {
		$(this).hide();
		$(this).parent('.bx-controls-auto-item').next().find('.bx-stop').show();
	});
	$('.bx-stop').on('click', function() {
		$(this).hide();
		$(this).parent('.bx-controls-auto-item').prev().find('.bx-start').show();
	});

	$('.notice').on('mouseover', function() {
		neswSlide.stopAuto();
	});

	$('.notice').on('mouseout', function() {
		neswSlide.startAuto();
	});
}

// MODAL
function ModalEvent() {
	if ($('.modalWrap').length > 0) {
		var $modal_btn = $('.md-btn');

		$modal_btn.on('click', function(e) {
			var $this = $(this),
			    $id = '#' + $this.attr('class').split(' ')[1],
			    $close_bg = '.md-bg';

			openModal($id, $close_bg);
			e.preventDefault();
		});

		function openModal(id, bg) {
			$(id).fadeIn();
			$(bg).fadeIn();
			if ($(id).is(':visible')) {
				$(bg).on('click', function() {
					$(id).fadeOut();
					$(this).fadeOut();
				});
			}
			$('.md-clo').on('click', function(e) {
				e.preventDefault();
				$(this).parent().parent().fadeOut();
				//var target = $(this).attr('href');
				//$(target).hide();
			});
		}

	}

}

function accordionEvt() {
	$('.accordion .accordion-link').on('click', function(e) {
		e.preventDefault();
		var dropDown = $(this).closest('.accordion-item').find('.accordion-body');
		$(this).closest('.accordion').find('.accordion-body').not(dropDown).slideUp();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).attr('title', '답변 열기');
		} else {
			$(this).closest('.accordion').find('.accordion-link.active').removeClass('active');
			$(this).addClass('active');
			$(this).attr('title', '답변 닫기');
		}
		dropDown.stop(false, true).slideToggle();

	});
};
