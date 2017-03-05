$(function() {
	quiz();
});

$(window).load(function() {
    check_if_in_viewport();
});

function check_if_in_viewport() {
    var cur_pos = $(window).scrollTop();
    $('.anim-elm').each(function() {
        if (cur_pos + $(window).height() >= $(this).offset().top + $(window).height() * 0.2) {
            $(this).addClass('animated');
        } else {
            $(this).removeClass('animated');
        }
    });
}

function quiz() {
    $('body').on('click', '[data-category]', function(){
        if ($('.completed').length) return;
        if (!$(this).hasClass('selected')) {
            $(this).siblings('li').removeClass('selected').parent().addClass('answered');
            $(this).addClass('selected');
        }
        //console.log($('.question:first-child + .answer ul li').length);
        if ($('.answered').length == $('.question').length) {
            $(this).closest('dl').addClass('completed');
            var categories = [];
            var count = $('.question:first-child + .answer ul li').length;

            for (var i = 1; i <= count; i++) {
                categories.push({
                    category: i, 
                    count:  $('.selected[data-category="'+ i +'"]').length
                });
            }
            //console.log(categories);

            categories = categories.sort(function (a, b) {
                return a.count-b.count;
            });
            //console.log(categories);
            var last = (categories[categories.length-1]).category;
            $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            $(".loader").addClass("active").delay(1000).queue(function(){
                $(this).removeClass("active").dequeue();
                $(".result[data-result='"+ last + "']").slideDown();
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            });
        }
    })
}


function resizeEvents(){

}

function scrollEvents(){
    check_if_in_viewport();
}

function resizeDelayEvents(){

}

var EventHandler = (function() {

    var callbacks = [],
        running = false,
 		timers = {},
   		delayedCallbacks = [];

    // fired on resize event

    function FiredEvent() {
        if (!running) {
            running = true;

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(runCallbacks);
            } else {
                setTimeout(runCallbacks, 66);
            }
        }
    }

    // run the actual callbacks
    function runCallbacks() {
        callbacks.forEach(function(callback) {
            callback();
        });

        delayedCallbacks.forEach(function(dcallback) {
        	var uid = dcallback.uid;
        	var ms = dcallback.delay;
        	if (timers[uid]) {
	            clearTimeout(timers[uid]);
	        }
	        timers[uid] = setTimeout(function(){
	        	dcallback.callback()
	        }, ms);
        });
        running = false;
    }

    // adds callback to loop
    function addCallback(callback) {
        if (callback) {
            callbacks.push(callback);
        }
    }

    function CallbackDetails(callback, delay, uid) {
	    this.callback = callback;
	    this.delay = delay;
	    this.uid = uid;
	}

 	function addDelayedCallback(callback, delay, uid) {
        if (callback && delay) {
        	var c = new CallbackDetails(callback, delay, uid)
            delayedCallbacks.push(c);
        }
    }

    return {
        // initalize resize event listener
        init: function(event, callback) {
            window.addEventListener(event, FiredEvent);
            addCallback(callback);
        },
        // initalize resize event listener with delay
        initWithDelay:function(event, callback, delay, uid){
  			window.addEventListener(event, FiredEvent);
            addDelayedCallback(callback, delay, uid);
        },
        // public method to add additional callback
        add: function(callback) {
            addCallback(callback);
        }
    }
}());

// start process
EventHandler.init('resize', function() {
    resizeEvents();
});

EventHandler.initWithDelay('resize', function() {
	resizeDelayEvents();
},300, 'DelayReInit');

var ticking = false;

/**Callback for our scroll event - just keeps a track on the last scroll value*/
function onScroll() {
    requestTick();
}

/*** Calls rAF if it's not already been done already*/
function requestTick() {
    if(!ticking) {
        requestAnimFrame(update);
        ticking = true;
    }
}

/*** Our animation callback*/
function update() {

	scrollEvents();

    // allow further rAFs to be called
    ticking = false;
}

// only listen for scroll events
window.addEventListener('scroll', onScroll, false);

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


