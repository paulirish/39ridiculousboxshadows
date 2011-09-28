function objectPosition(obj) {
	var curleft = 0;
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}

window.box = document.getElementsByClassName('source')[0];
window.boxshadow = box.getElementsByTagName('span')[0];
window.boxLeft = objectPosition(box)[0];
window.boxTop = objectPosition(box)[1];
window.canvasWidth = window.innerWidth;
window.canvasHeight = window.innerHeight; 
window.timer = 0;

document.body.addEventListener('mousemove', function(movement){

	function moveShadows(){

		var mouseLeft = movement.pageX,
			mouseTop = movement.pageY,
			distanceFromBoxX = mouseLeft - boxLeft - 75,
			distanceFromBoxY = mouseTop - boxTop - 75,
			normalizedDistanceX = (distanceFromBoxX / canvasWidth),
			normalizedDistanceY = (distanceFromBoxY / canvasHeight),

			//shadow
			shadowLeftMultiplier = -40,
			shadowTopMultiplier = -10,
			shadowTopOffset = 20,
			newShadowLeft = normalizedDistanceX * shadowLeftMultiplier + 'px',
			newShadowTop = normalizedDistanceY * shadowTopMultiplier + shadowTopOffset + 'px',

			// gradient
			gradientLeftMultiplier = 120,
			gradientTopMultiplier = 80,
			gradientLeftOffset = 75,
			gradientTopOffset = 20,
			newGradientLeft = normalizedDistanceX * gradientLeftMultiplier + gradientLeftOffset,
			newGradientTop = normalizedDistanceY * gradientTopMultiplier + gradientTopOffset,
			gradient = '-webkit-gradient(';
		
		gradient += 'radial, ';
		gradient += newGradientLeft + ' ' + newGradientTop + ', ';
		gradient += '75, ';
		gradient += newGradientLeft + ' ' + newGradientTop + ', ';
		gradient += '40, ';
		gradient += 'from(#444), ';
		gradient += 'to(#777)';
		gradient += ')';

		if(distanceFromBoxY !== 0 && distanceFromBoxX !== 0){
			window.boxshadow.style.left = newShadowLeft;
			window.boxshadow.style.top = newShadowTop;
			window.box.style.background = gradient;
		}

	}

	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(moveShadows, 10);

});