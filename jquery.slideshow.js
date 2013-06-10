
/**
 * Slideshow jQuery Plugin 
 * Creates a basic slideshow out of a ul list
 */

(function ($)
{
    "use strict";
	
	//defualt settings
	var settings = {
		
		/**
		 * if set will display or init slideshow navigation. 
		 * @param nav [String || object] - default is null
		 * - for String, values can be prev, next, and/or menu ( ex. "prev next menu" ) 
		 * - for Object, you can set the selectors for { next : "", prev : "", menu : "" } 
		 * 		NOTE: menu will be auto-populated with a list of <a> tags for each slide, if menu is a ul list, <a>'s will be wrapped in <li> 's
		 * 
		 */
		nav : null,
		
		/**
		 * html used to create navigation 
		 * @param html [object]
		 */
		html : {
			next : '<a class="nav next" title="Next">Next</a>',
			prev : '<a class="nav prev" title="Previous">Previous</a>',
			menu : '<ul class="nav menu"></ul>',
			menuBtn : '<a title="View slide {i}" >{i}</a>'
		},
		
		/**
		 * Sets the delay between slides 
		 * @param delay [int] 
		 */
		delay : 7000,
		
		/**
		 * Allows you to specify what items are considered slides in the slideshow.
		 * @param slidesSelector [String] - default is ul.slides > li
		 */
		slidesSelector 	: "ul.slides > li",
		
		/**
		 * Function to call each time the slideshow index changes.
		 * Used for animating the slides.
		 * @param onChange [function] - default is a fade animation
		 * 
		 */
		onChange : function (event, index, $slides, $slideshow)
		{
			//fade out visible slide
			$slides.filter(":visible").fadeOut();
			
			//find slide at index and fade in
			$slides.eq(index).stop().fadeIn();
		}
		
   	};
	
	//public methods
    var methods = {
    	
    	init: function (options)
        {
        	settings = $.extend(settings, options);
        	
        	$control    = $(this);
        	$slides		= $control.find( settings.slidesSelector );
        	delay		= settings.delay;
        	
        	//add any nav items
        	if( settings.nav !== null )
        		addNav( settings.nav );
        		
        	//add change event
        	$control.on("change.slideshow", settings.onChange);
        	
        	//show first slide and start timer
        	gotoSlide(0);
        },
        
        next : function()
        {
        	gotoSlide( index + 1 );
        },
        
        prev : function()
        {
        	gotoSlide( index - 1 );
        },
        
        index : function(value)
        {
        	if(typeof value !== 'undefined' && value !== null)
        		gotoSlide(value);
        	else
        		return index;
        },
        
        disabled : function(value)
        {
        	disabled = value;
        },
        
        pause : function()
        {
        	paused = true;
        	resetTimer();
        },
        
        play : function()
        {
        	paused = false;
        	resetTimer();
        }
    };

	$.fn.slideshow = function(method)
    {
        // Method calling logic
        if (methods[method])
        {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method)
        {
            return methods.init.apply(this, arguments);
        } else
        {
            $.error('Method ' + method + ' does not exist for slideshow');
        }
        
        return this;
    }
	
	//private variables
	var index 		= -1,
		$control 	= null,
		$slides		= null,
		timer 		= null,
		delay		= 0,
		paused		= false,
		disabled	= false;
	
	//private methods
	function gotoSlide(i)
	{
		if(disabled) return;

		if( i !== index )
		{
			//count children
			var t = $slides.length - 1;
		
			//limit index
			index = limitWrap(i, 0, t);
			
			//show child at index
			$control.trigger("change.slideshow", [index, $slides, $control]);
		}
		
		//reset timer
		resetTimer();
		
	}
	
	function resetTimer()
	{
		clearTimeout(timer);
		
		if(!paused && delay > 0)
		{
			timer = setTimeout(methods.next, delay);
		}
	}
	
	function addNav( type )
	{
		var s = {prev:null, next:null, menu:null };
		
		//check if type is string
		if(typeof type === "string")
		{
			//add previous button
			if( /(prev)/.test(type) === true )
			{
				s.prev = $(settings.html.prev).appendTo($control);
			}
			
			//add next button
			if( /(next)/.test(type) === true )
			{
				s.next = $(settings.html.next).appendTo($control);
			}
			
			//add menu
			if( /(menu)/.test(type) === true )
			{
				s.menu = $(settings.html.menu).appendTo($control);
			}
		}
		else
		{
			//pass selector object over
			s = type;
		}
		
		//add click listeners
		$(s.prev).on('click', function(e)
		{
			e.preventDefault();
			methods.prev();
		});
		
		$(s.next).on('click', function(e)
		{
			e.preventDefault();
			methods.next();
		});	
		
		if(s.menu !== null)
		{
			var $m = $(s.menu).html("");
			
			//create <a> tags and listeners
			$slides.each(function(i) 
			{
				var $b = $( settings.html.menuBtn.replace("{i}", i+1) )
							.appendTo($m)
							.on('click', function(e) {
								e.preventDefault();
								methods.index(i);
							});
							
				if( $m.is("ul") ) $b.wrap("<li>");
			});
		}
		
	}
	
	function limitWrap(x, min, max)
	{
		return (x > max) ? min : ( (x < min) ? max : x );
	}


}(jQuery));




