var HomeView = function() {

    this.initialize = function() {
		home=this;

        // Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		this.el.on('click', '#login', this.showList);
 		
		};
		
		
		
	this.render = function(template) {
		this.el.html(template());
        return this;
    };
	this.renderP = function(template,param) {
		//console.log(template);
		// console.log(param);
        this.el.html(template(param));
        return this;
    };
	
	
    this.backlist =function()
    {
		syncRoutesOnLogin=false;
		window.location.hash = null;
		$('#mesg').hide();
		if(!isInternetOn)
		{
			offlineRoutes();
		}
		else
		{
			var data={'Token':api_token , 'Client':'TEST+CLIENT+1' , 'ProviderID':authen_PID};
			apiCall('ListRoutes',data);
		}
        return false;
    };
    this.logout = function()
    {
        var users = JSON.parse(window.localStorage.getItem("userdetail"));
        $('body').html(new HomeView(self.store).renderP(HomeView.template,users).el);
        $('body').removeClass('cbp-spmenu-push-toleft').css('transition','none');
    };

    this.initialize();

}

HomeView.template = Handlebars.compile($("#login-tpl").html());
