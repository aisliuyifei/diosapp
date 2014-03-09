jQuery(document).ready(function(){
	
	initTabs();
});
function initTabs() {
	var _speed = 500;
	var _tabset = jQuery('.tabset');
		
	_tabset.each(function(){
		var _tabsetEl = jQuery(this).find('a.tab'),
			_hold = jQuery('.tabs-holder');
		
		var hash = window.location.hash;
		var _hash = hash.substr(2, hash.length);
		
		if (_hash.length > 1){
			_tabsetEl.removeClass('active');
			_tabsetEl.each(function(){
				if (this.hash.substr(2,this.hash.length) == _hash){
				jQuery(this).addClass('active');}
			}); 
		}else{	
			if (window.location.href.indexOf('?_escaped_fragment_=') != -1){
				window.location.href = window.location.href.replace('?_escaped_fragment_=','#!')
			}
		}
		
		
		
		_tabsetEl.each(function(){
			if (jQuery(this).hasClass('active'))
			loadAjax(jQuery(this).attr('href'));
		}); 
		_tabsetEl.click(function(){
			if (!jQuery(this).hasClass('active')) {
				_tabsetEl.removeClass('active');
				jQuery(this).addClass('active');
				var _url = jQuery(this).attr('href'),
					_tabs = _hold.children('div.tab');

				
				if (jQuery.browser.msie){_tabs.hide();
				}else{_tabs.fadeOut(_speed);}
				var _tab = jQuery('div[rel='+ _url +']');
				if (_tab.length) {
					if (jQuery.browser.msie){_tab.show();
					}else{_tab.fadeIn(_speed);}
					_hold.height(_tab.outerHeight());
				}
				else {
					loadAjax(_url);
				}
			}
			window.location.hash = this.hash;
			return false;
		});
		function loadAjax(_url) {
			jQuery.ajax({
				type: 'POST',
				url: _url,
				data: "ajax=1",
				success: function(msg){
					var mess = jQuery(msg);
					mess.attr('rel',_url);
					
					mess.appendTo(_hold);
					if (!jQuery.browser.msie){mess.hide().fadeIn(_speed);}
					_hold.height(mess.outerHeight());
					
					var gal = mess.find('div.gallery-block');
					if (gal.length)
						gal.gallery({
							duration: 500,
							listOfSlides: '.gallery-item'
						});
				}
			});
		}
	});
}
(function($) {
	$.fn.gallery = function(options) { return new Gallery(this.get(0), options); };
	
	function Gallery(context, options) { this.init(context, options); };
	
	Gallery.prototype = {
		options:{},
		init: function (context, options){
			this.options = $.extend({
				duration: 700,
				slideElement: 1,
				autoRotation: false,
				effect: false,
				listOfSlides: 'ul > li',
				switcher: false,
				disableBtn: false,
				nextBtn: 'a.link-next, a.btn-next, a.next',
				prevBtn: 'a.link-prev, a.btn-prev, a.prev',
				circle: true,
				direction: false,
				event: 'click',
				IE: false
			}, options || {});
			var _el = $(context).find(this.options.listOfSlides);
			if (this.options.effect) this.list = _el;
			else this.list = _el.parent();
			if (this.options.switcher) this.switcher = $(context).find(this.options.switcher);
			this.nextBtn = $(context).find(this.options.nextBtn);
			this.prevBtn = $(context).find(this.options.prevBtn);
			this.count = _el.index(_el.filter(':last'));
			
			if (this.options.switcher) this.active = this.switcher.index(this.switcher.filter('.active:eq(0)'));
			else this.active = _el.index(_el.filter('.active:eq(0)'));
			if (this.active < 0) this.active = 0;
			this.last = this.active;
			
			this.woh = _el.outerWidth(true);
			if (!this.options.direction) this.installDirections(this.list.parent().width());
			else {
				this.woh = _el.outerHeight(true);
				this.installDirections(this.list.parent().height());
			}
			
			if (!this.options.effect) {
				this.rew = this.count - this.wrapHolderW + 1;
				if (!this.options.direction) this.list.css({marginLeft: -(this.woh * this.active)});
				else this.list.css({marginTop: -(this.woh * this.active)});
			}
			else {
				this.rew = this.count;
				this.list.css({opacity: 0}).removeClass('active').eq(this.active).addClass('active').css({opacity: 1}).css('opacity', 'auto');
				if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
			}
			
			if (this.options.disableBtn) {
				if (this.count < this.wrapHolderW) this.nextBtn.addClass(this.options.disableBtn);
				if (this.active == 0) this.prevBtn.addClass(this.options.disableBtn);
			}
			
			this.initEvent(this, this.nextBtn, this.prevBtn, true);
			this.initEvent(this, this.prevBtn, this.nextBtn, false);
			
			if (this.options.autoRotation) this.runTimer(this);
			
			if (this.options.switcher) this.initEventSwitcher(this, this.switcher);
		},
		installDirections: function(temp){
			this.wrapHolderW = Math.floor(temp / this.woh);
			if (((this.wrapHolderW - 1) * this.woh + this.woh / 2) > temp) this.wrapHolderWwrapHolderW--;
		},
		fadeElement: function(){
			if ($.browser.msie && this.options.IE){
				this.list.eq(this.last).css({opacity:0});
				this.list.removeClass('active').eq(this.active).addClass('active').css({opacity:'auto'});
			}
			else{
				this.list.eq(this.last).animate({opacity:0}, {queue:false, duration: this.options.duration});
				this.list.removeClass('active').eq(this.active).addClass('active').animate({
					opacity:1
				}, {queue:false, duration: this.options.duration, complete: function(){
					$(this).css('opacity','auto');
				}});
			}
			if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
			this.last = this.active;
		},
		scrollElement: function(){
			if (!this.options.direction) this.list.animate({marginLeft: -(this.woh * this.active)}, {queue:false, duration: this.options.duration});
			else this.list.animate({marginTop: -(this.woh * this.active)}, {queue:false, duration: this.options.duration});
			if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
		},
		runTimer: function($this){
			if($this._t) clearTimeout($this._t);
			$this._t = setInterval(function(){
				$this.toPrepare($this, true);
			}, this.options.autoRotation);
		},
		initEventSwitcher: function($this, el){
			el.bind($this.options.event, function(){
				$this.active = $this.switcher.index($(this));
				if($this._t) clearTimeout($this._t);
				if (!$this.options.effect) $this.scrollElement();
				else $this.fadeElement();
				if ($this.options.autoRotation) $this.runTimer($this);
				return false;
			});
		},
		initEvent: function($this, addEventEl, addDisClass, dir){
			addEventEl.bind($this.options.event, function(){
				if($this._t) clearTimeout($this._t);
				if ($this.options.disableBtn &&($this.count > $this.wrapHolderW)) addDisClass.removeClass($this.options.disableBtn);
				$this.toPrepare($this, dir);
				if ($this.options.autoRotation) $this.runTimer($this);
				return false;
			});
		},
		toPrepare: function($this, side){
			if (($this.active == $this.rew) && $this.options.circle && side) $this.active = -$this.options.slideElement;
			if (($this.active == 0) && $this.options.circle && !side) $this.active = $this.rew + $this.options.slideElement;
			for (var i = 0; i < $this.options.slideElement; i++){
				if (side) {
					if ($this.active + 1 > $this.rew) {
						if ($this.options.disableBtn && ($this.count > $this.wrapHolderW)) $this.nextBtn.addClass($this.options.disableBtn);
					}
					else $this.active++;
				}
				else{
					if ($this.active - 1 < 0) {
						if ($this.options.disableBtn && ($this.count > $this.wrapHolderW)) $this.prevBtn.addClass($this.options.disableBtn);
					}
					else $this.active--;
				}
			};
			if ($this.active == $this.rew && side) if ($this.options.disableBtn &&($this.count > $this.wrapHolderW)) $this.nextBtn.addClass($this.options.disableBtn);
			if ($this.active == 0 && !side) if ($this.options.disableBtn &&($this.count > $this.wrapHolderW)) $this.prevBtn.addClass($this.options.disableBtn);
			if (!$this.options.effect) $this.scrollElement();
			else $this.fadeElement();
		},
		stop: function(){
			if (this._t) clearTimeout(this._t);
		},
		play: function(){
			if (this._t) clearTimeout(this._t);
			if (this.options.autoRotation) this.runTimer(this);
		}
	}
}(jQuery));