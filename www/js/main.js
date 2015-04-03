var app = {

	showAlert: function (message, title)
	{
      if(navigator.notification)
	  {
        navigator.notification.alert(message, null, title, 'OK');
      }
	  else
	  {
	    alert(title ? (title + ": " + message) : message);
      }
	},

   
    initialize: function()
	{

		var self = this;
		this.routeURL = /^#route\/(\d{1,})/;
		//this.registerEvents();
	    document.addEventListener("deviceready", this.onDeviceReady, false);
		this.store = new LocalStorageStore(function()
		{
		    $('body').html(new HomeView(self.store).render(HomeView.template).el);
		});

	},
		 
	registerEvents: function() {
    var self = this;
       $(window).on('hashchange', $.proxy(this.route, this));
    // Check of browser supports touch events...
    if (document.documentElement.hasOwnProperty('ontouchstart')) {
        // ... if yes: register touch event listener to change the "selected" state of the item
        $('body').on('touchstart', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('touchend', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    } else {
        // ... if not: register mouse events instead
        $('body').on('mousedown', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    }
},
	route: function()
	{
        var hash = window.location.hash;
    },
	
	checkConnection: function()
	{
	    
		    var networkState = false;
	
	        if(app.isPhonegap())
			{
			    networkState = navigator.network.connection.type;
			    var states = {};
				states[Connection.UNKNOWN]  = 'Unknown connection';
				states[Connection.ETHERNET] = 'Ethernet connection';
				states[Connection.WIFI]     = 'WiFi connection';
				states[Connection.CELL_2G]  = 'Cell 2G connection';
				states[Connection.CELL_3G]  = 'Cell 3G connection';
				states[Connection.CELL_4G]  = 'Cell 4G connection';
				states[Connection.NONE]     = 'No network connection';
				//console.log('Connection : ' + Connection);
				//console.log('Connection type: ' + states[networkState]);
				if(networkState==Connection.NONE) {	$('p.offline').show(); 	}
				//alert('checkConnection='+networkState);
				return networkState;
				
				// alert('Connection type: '+  networkState+ states[networkState]);
			}
			
			else
			{
			  
			  networkState = navigator.onLine ? 'online' : 'offline';
			  
			  return networkState;
			}
	
	        
	},
	
	
	isPhonegap:function() {
		    return (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
	},

	onDeviceReady:function()
	{
		
		$("#first_img").css( { 'height': $(window).height() }, { queue: false, duration: 800 });
		
		$("#first_img").css( { 'width': $(window).width() }, { queue: false, duration: 800 });

		document.addEventListener("offline", onOffline, false);
		
		document.addEventListener("online", onOnline, false);
		
		$(".container").css( { 'height': $(window).height() }, { queue: false, duration: 800 });
		
		$( ".parent" ).css( { 'height':$(document).height() }, { queue: false, duration: 800 });
		
		menus();
		
		$('.menu-ul li a').click(function()
		{			
			var class_name = $(this).attr('class');

            chnageImagesrc(class_name);			
			
		});
			 
	    //validate();	

	},
	
	deviceInfo: function()
	{
	 var DeviceInfo =			'Device_Name: '     + device.name     + ',' + 
                           // 'Device_Cordova: '  + device.cordova + ',' + 
								 'Device_Platform: ' + device.platform + ',' + 
								 'Device_UUID: '     + device.uuid     + ',' + 
								 'Device_device_ip_address: '     + device.uuid     + ',' + 
								 'Device_Version: '  + device.version  ;
	 return DeviceInfo;

	}
};

    
	function onOffline()
	{
	
	}
	
	function onOnline()
	{
		
	}
	
	function menus()
	{
	    var pushy = $('.pushy'), //menu css class
		body = $('body'),
		container = $('#container'), //container css class
		push = $('.push'), //css class to add pushy capability
		siteOverlay = $('.site-overlay'), //site overlay
		pushyClass = "pushy-left pushy-open", //menu position & menu open class
		pushyActiveClass = "pushy-active", //css class to toggle site overlay
		containerClass = "container-push", //container open class
		pushClass = "push-push", //css class to add pushy capability
		menuBtn = $('.menu-btn, .pushy a'), //css classes to toggle the menu
		menuSpeed = 200, //jQuery fallback menu speed
		menuWidth = pushy.width() + "px"; //jQuery fallback menu width

	function togglePushy(){
		body.toggleClass(pushyActiveClass); //toggle site overlay
		pushy.toggleClass(pushyClass);
		container.toggleClass(containerClass);
		push.toggleClass(pushClass); //css class to add pushy capability
	}

	function openPushyFallback(){
		body.addClass(pushyActiveClass);
		pushy.animate({left: "0px"}, menuSpeed);
		container.animate({left: menuWidth}, menuSpeed);
		push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
	}

	function closePushyFallback(){
		body.removeClass(pushyActiveClass);
		pushy.animate({left: "-" + menuWidth}, menuSpeed);
		container.animate({left: "0px"}, menuSpeed);
		push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
	}

	//checks if 3d transforms are supported removing the modernizr dependency
	cssTransforms3d = (function csstransforms3d(){
		var el = document.createElement('p'),
		supported = false,
		transforms = {
		    'webkitTransform':'-webkit-transform',
		    'OTransform':'-o-transform',
		    'msTransform':'-ms-transform',
		    'MozTransform':'-moz-transform',
		    'transform':'transform'
		};

		// Add it to the body to get the computed style
		document.body.insertBefore(el, null);

		for(var t in transforms){
		    if( el.style[t] !== undefined ){
		        el.style[t] = 'translate3d(1px,1px,1px)';
		        supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
		    }
		}

		document.body.removeChild(el);

		return (supported !== undefined && supported.length > 0 && supported !== "none");
	})();

	if(cssTransforms3d){
		//toggle menu
		menuBtn.click(function() {
			togglePushy();
		});
		//close menu when clicking site overlay
		siteOverlay.click(function(){ 
			togglePushy();
		});
	}else{
		//jQuery fallback
		pushy.css({left: "-" + menuWidth}); //hide menu by default
		container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

		//keep track of menu state (open/close)
		var state = true;

		//toggle menu
		menuBtn.click(function() {
			if (state) {
				openPushyFallback();
				state = false;
			} else {
				closePushyFallback();
				state = true;
			}
		});

		//close menu when clicking site overlay
		siteOverlay.click(function(){ 
			if (state) {
				openPushyFallback();
				state = false;
			} else {
				closePushyFallback();
				state = true;
			}
		});
	  }
	}
			
	      
	/*function validate()
	{
			$('#loginForm').bootstrapValidator({
			// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				user_id: {
					message: 'The username is not valid',
					validators: {
						notEmpty: {
							message: 'The username is required and cannot be empty'
						},
						stringLength: {
							min: 6,
							max: 30,
							message: 'The username must be more than 6 and less than 30 characters long'
						},
						/*regexp: {
							regexp: /^[a-zA-Z0-9]+$/,
							message: 'The username can only consist of alphabetical and number'
						},*
						different: {
							field: 'password',
							message: 'The username and password cannot be the same as each other'
						}
					}
				},
			  /*  email: {
					validators: {
						notEmpty: {
							message: 'The email address is required and cannot be empty'
						},
						emailAddress: {
							message: 'The email address is not a valid'
						}
					}
				},*
			   password: {
					validators: {
						notEmpty: {
							message: 'The password is required and cannot be empty'
						},
						different: {
							field: 'username',
							message: 'The password cannot be the same as username'
						},
						stringLength: {
							min: 0,
							message: 'The password must have at least 7 characters'
						}
					}
				},
			  
			}
		});
    }
	*/