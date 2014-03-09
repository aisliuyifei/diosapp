/* Clear Fields */
//弹窗js代码   
function showid(idname){   
var isIE = (document.all) ? true : false;   
var isIE6 = isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);   
var newbox=document.getElementById(idname);   
newbox.style.zIndex="9999";   
newbox.style.display="block"  
newbox.style.position = !isIE6 ? "fixed" : "absolute";   
newbox.style.top =newbox.style.left = "50%";   
newbox.style.marginTop = - newbox.offsetHeight / 2 + "px";   
newbox.style.marginLeft = - newbox.offsetWidth / 2 + "px";   
var layer=document.createElement("div");   
layer.id="layer";   
layer.style.width=layer.style.height="100%";   
layer.style.position= !isIE6 ? "fixed" : "absolute";   
layer.style.top=layer.style.left=0;   
layer.style.backgroundColor="#000";   
layer.style.zIndex="9998";   
layer.style.opacity="0.6";   
document.body.appendChild(layer);   
var sel=document.getElementsByTagName("select");   
for(var i=0;i<sel.length;i++){   
sel[i].style.visibility="hidden";   
}   
function layer_iestyle(){   
layer.style.width=Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth)   
+ "px";   
layer.style.height= Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) +   
"px";   
}   
function newbox_iestyle(){   
newbox.style.marginTop = document.documentElement.scrollTop - newbox.offsetHeight / 2 + "px";   
newbox.style.marginLeft = document.documentElement.scrollLeft - newbox.offsetWidth / 2 + "px";   
}   
if(isIE){layer.style.filter ="alpha(opacity=60)";}   
if(isIE6){   
layer_iestyle()   
newbox_iestyle();   
window.attachEvent("onscroll",function(){   
newbox_iestyle();   
})   
window.attachEvent("onresize",layer_iestyle)   
}   
layer.onclick=function(){newbox.style.display="none";layer.style.display="none";for(var i=0;i<sel.length;i++){   
sel[i].style.visibility="visible";   
}}   
}  


$(document).ready(function() {
 // Handler for .ready() called.// jquery is loaded

// now put your code in here
    $('input[type=text]').focus(function() {
      $(this).val('') == '';
      });
      
      $('input[type=email]').focus(function() {
      $(this).val('') == '';
      });
});



var iPadLabels = function () {
			function fix() {
				var labels = document.getElementsByTagName('label'), 
					target_id, 
					el;
				for (var i = 0; labels[i]; i++) {
					if (labels[i].getAttribute('for')) {
						labels[i].onclick = labelClick;
					}
				}
			};
			function labelClick() {
				el = document.getElementById(this.getAttribute('for'));
				if (['radio', 'checkbox'].indexOf(el.getAttribute('type')) != -1) {
					el.setAttribute('selected', !el.getAttribute('selected'));
				} else {
					el.focus();
				}
			};
				return {
				fix: fix
			}
		}();
		
		window.onload = function () {
					
					iPadLabels.fix();
				
		}
		
		

$(document).ready(function() {

	$( 'div.hide-sub-block' ).toggle ( function() { $( 'div.sub-block' ).css( 'max-height', '150px' ) }, function() {  $( 'div.sub-block' ).css( 'max-height', '500px' )} );
	
	$( 'div.hide-sub-block' ).toggle ( function() { $( 'div.hide-sub-block' ).css( 'top', '122px' ) }, function() {  $( 'div.hide-sub-block' ).css( 'top', '150px' )} );
	
	$( 'div.hide-sub-block' ).toggle ( function() { $( 'div.close-block' ).css( 'background-position-x', '100%' ) }, function() {  $( 'div.close-block' ).css( 'background-position-x', '0' )} );
	
	$( 'div.hide-sub-block' ).toggle ( function() { $( 'div.close-block-label' ).html( "Open" ) }, function() {  $( 'div.close-block-label' ).html( "Close" ) } );
	
	//Show Pixie
	$( 'div.view-reel' ).mouseenter ( function() { 
		$( 'div.show-pixie' ).css( 'opacity', '1' );
	} );
	
	$( 'div.view-reel' ).mouseleave ( function() { 
		$( 'div.show-pixie' ).css( 'opacity', '0' ); 
	} );
	
	
	// Video Box
	$( 'div.view-reel' ).click ( function() { 
		$( 'div.video-box-overlay' ).css( 'display', 'block' );
		$( 'div.video-box-container' ).css( 'display', 'block' );
		$( 'div.video-box-container' ).html( '<iframe src="http://player.vimeo.com/video/37323358?portrait=0&amp;color=ffffff" width="960" height="540" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen autoplay></iframe>' ); 
	} );
	
	$( 'div.video-box-overlay' ).click ( function() { 
		$( 'div.video-box-overlay' ).css( 'display', 'none' ); 
		$( 'div.video-box-container' ).css( 'display', 'none' );
		$( 'div.video-box-container' ).html( '' ); 
	} );
	
	
});