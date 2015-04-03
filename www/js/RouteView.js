var ListView = function() {

    this.initialize = function() {
		list=this;

        // Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		
		};
		
	this.render = function(template) {
		
        this.el.html(template());
        return this;
    };
	this.ListAll = function()
	{
		$('body').html(new ListView().render(ListView.List).el);
	}

    this.initialize();

}
//ListView.List      		= Handlebars.compile($("#list").html());