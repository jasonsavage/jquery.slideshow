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