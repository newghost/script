/*
Author: Kris, github.com/newghost
Useage: 
	$.printView(); 		//show only print style
	$.printView(true);	//show screen and print style
*/
(function($) {

	/*
	keepScreen: keep screen css in print view?
	*/
	$.printView = function(keepScreen) {
		var $styles = $("link");
		
		for(var idx = $styles.length; idx-- > 0;){
			var $style = $($styles[idx])
			  , media  = $style.attr("media") || '';

			/* switch the CSS type */
			if (media.toLowerCase().indexOf("print") > -1) {
				$style.clone()
					.attr({"media": "screen, projection"})
					.appendTo($("head"));
			} else {
				keepScreen
					? $style.attr("media", media + ", screen, print")
					: $style.remove();
			}
		}
	};

})(jQuery);