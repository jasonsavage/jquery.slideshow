jquery.slideshow
================

Basic jquery.slideshow() that allows full control over the animation when switching slides.

At the most basic usage, this plugin with fade in and out a group of elements:

```html
<div class="slideshow">
	<ul class="slides">
	    <li><img src="img/slide-1.jpg" alt="" /></li>
	    <li><img src="img/slide-2.jpg" alt="" /></li>
	    <li><img src="img/slide-3.jpg" alt="" /></li>
	    <li><img src="img/slide-4.jpg" alt="" /></li>
	</ul>
</div>
```

```javascript
$(".slideshow").slideshow();
```

A more custom and advanced version of the same html markup might be:

```javascript
$(".slideshow").slideshow({

	//change slide every 10 seconds
	delay : 10 * 1000, 
	
	// auto add a prev, next, and menu
	nav : "prev next menu",
	
	//on change, animate each slide in from right instead of fade
	onChange : function(event, index, $slides, $show)
	{
		//don't allow the user to click any buttons until animation is done
		$show.slideshow("disabled", true);
		
		//animate in from right (-x)
		$list.stop().animate({ left : (index * -300) }, 300, 'swing', function()
		{
			//re-enable buttons
			$show.slideshow("disabled", false);
		});
	}
});
```
