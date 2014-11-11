jQuery(function($){
	$('.next-input-text').on('blur', function(){
		var nextIndex = $(this).data('next-index') + 1;
		var inputNext = $('input[data-next-index="' + nextIndex + '"]');
		if(!$(this).hasClass('date-picker')) {
			inputNext.focus();
		}
	});

	var availableTags = [
		"Denpasar Bali (DPS), Indonesia",
		"Jakarta (JKT), Indonesia",
		"Balikpapan (BPN), Indonesia",
		"Surabaya (SUB), Indonesia"
	];
	$('.autocomplete-place').autocomplete({
		source: availableTags,
		minLength: 0,
		 open: function (e, ui) {
            var acData = $(this).data('ui-autocomplete');
            acData
                .menu
                .element
                .find('li')
                .each(function () {
                    var me = $(this);
                    var keywords = acData.term.split(' ').join('|');
                    me.html(me.text().replace(new RegExp("(" + keywords + ")", "gi"), '<b>$1</b>'));
                });
        },
		 select: function( event, ui ){
			$(this).blur();
		  }
	});
	$('.show-autocomplete').on('click', function(){
		$(this).siblings('.autocomplete-place').autocomplete( "search", "" );
	});
	
	$('.validate-form').each(function(){
		$(this).validate({
			// onfocusout: function(element) {
			   // this.element(element);
			// },
			focusInvalid: false,
			rules: {
				recaptcha_response_field: 'required'
				
			},
			messages: {          
				recaptcha_response_field: 'You need to enter the characters above'				
			}
		});	
	});	
	
	$('.select-trip button').on('click', function(){
		$(this).addClass('active btn-info');
		$(this).removeClass('btn-default');
		$(this).closest('.select-trip').find('button').not(this).removeClass('active btn-info');
		$(this).closest('.select-trip').find('button').not(this).addClass('btn-default');
		
		if($(this).hasClass('single-trip')){
			$('.return-wrapper').fadeOut(200);
		} else {
			$('.return-wrapper').fadeIn(200);
		}
	});
	
	$('#slideshow').cycle();
		
	$('.selectpicker').selectpicker();
	
	$("#depart").datepicker({
		minDate: 0,
		numberOfMonths: 2,
		onSelect: function(selected) {
			$("#return").datepicker("option","minDate", selected);
			window.setTimeout($.proxy(function() {
				$("#return").focus();
			}, this), 10);
		}
	});
	$("#return").datepicker({
		minDate: 0,
		numberOfMonths: 2,
		onSelect: function(selected) {
			$("#depart").datepicker("option","maxDate", selected)
		}
	});
	
	$('.slider').slider({
		range: true,
		min: 0,
		max: 1440,
		step: 15,
		values: [ 0, 1440 ], //or whatever default time you want
		slide: function(e, ui) {
			var hours1 = Math.floor( ui.values[0] / 60 );
			var minutes1 = ui.values[0] - ( hours1 * 60 );

			if ( hours1.length == 1 ) 
				hours1 = '0' + hours1;
			if ( minutes1.length == 1 ) 
				minutes1 = '0' + minutes1;
			if ( minutes1 == 0 ) 
				minutes1 = '00';

			if ( hours1 >= 12 ) {

				if (hours1 == 12){
					hours1 = hours1;
					minutes1 = minutes1 + " PM";
				} else {
					hours1 = hours1 - 12;
					minutes1 = minutes1 + " PM";
				}
			} else {
				hours1 = hours1;
				minutes1 = minutes1 + " AM";
			}
			
			if ( hours1 == 0 ){
				hours1 = 12;
				minutes1 = minutes1;
			}

			$(this).siblings('.slider-time').html(hours1+':'+minutes1);

			var hours2 = Math.floor(ui.values[1] / 60);
			var minutes2 = ui.values[1] - (hours2 * 60);

			if ( hours2.length == 1 ) 
				hours2 = '0' + hours2;
			if ( minutes2.length == 1 ) 
				minutes2 = '0' + minutes2;
			if ( minutes2 == 0 ) 
				minutes2 = '00';
			if ( hours2 >= 12 ){
				if ( hours2 == 12 ){
					hours2 = hours2;
					minutes2 = minutes2 + " PM";
				} else if ( hours2 == 24 ){
					hours2 = 11;
					minutes2 = "59 PM";
				} else {
					hours2 = hours2 - 12;
					minutes2 = minutes2 + " PM";
				}
			} else {
				hours2 = hours2;
				minutes2 = minutes2 + " AM";
			}

			$(this).siblings('.slider-time_2').html(hours2+':'+minutes2);
		}
	});
	
	$('.panel-toggle').on('click', function(){
		$(this).parents('.panel').toggleClass('panel-collapse');
		
		return false;
	});
	
	$('.custom-radio').uniform({radioClass: 'uniform-radio'});
	
	// $(window).scroll(function(){
		// var scLeft = $(window).scrollLeft();		
		  // if ( scLeft >= 0) {
			// $('#slideshow-wrapper').css('left', (-1 * scLeft)+'px').stop();
		  // }
	// });	
	
	$(window).resize(function(){
		var windowWidth = $( window ).width();
		if(windowWidth < 1400){
			var quarrel = windowWidth - 1000;
			$('.home .content-wrapper').css('left', quarrel +'px');
			$('#slideshow-wrapper').css('left', (quarrel - 400) +'px');
		}
	});
	
	$(window).resize();

});