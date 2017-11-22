;(function(){

			// Menu settings
			//Function that is toggled whenever the #menuToggle and .menu-close are clicked on
			$('#menuToggle, .menu-close').on('click', function(){
				//Toggles between the active class
				$('#menuToggle').toggleClass('active');
				//Toggles the optional body class
				$('body').toggleClass('body-push-toleft');
				//Toggles the menu-open class
				$('#theMenu').toggleClass('menu-open');
				//Rotates the arrow 180 degrees
				$(".fa-arrow-right").toggleClass("rotate");
			});
})(jQuery)