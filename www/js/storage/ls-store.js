var LocalStorageStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var employees = JSON.parse(window.localStorage.getItem("employees"));
        var results = employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 ;
        });
        callLater(callback, results);
    }
	
this.AllReservations = function( callback ) {
	console.log('In AllReservations');
	        var reservations = JSON.parse(window.localStorage.getItem("reservations"));
        var results = reservations.filter(function(element) {
			console.log(element);
			if(element!= null)
			{
            var fullName = element.id + " " + element.pickUpLoc;
            return fullName.toLowerCase() ;
			}
        });
		console.log(results);
        callLater(callback, results);
    }



    this.findById = function(id, callback) {
		console.log(id+'vvvvvvvvvvvv');
	    var reservations = JSON.parse(window.localStorage.getItem("reservations"));
        var reservation = null;
        var l = reservations.length;console.log(reservations+'lnth='+l);
        for (var i=0; i < l; i++) {
			console.log(reservations[i].id +'==='+ id)
            if (reservations[i].id === id) {
                reservation = reservations[i];
				console.log(reservation+'if')
                break;
            }
        }
		console.log(id+'vvvvvvvvvvvv'+reservation);
        callLater(callback, reservation);
    }
	

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
		
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

  
		var reservations=[
			//{'id':1, 'pickUpLoc': 'Ludhiana, India','dropLoc':'Delhi,India','carType':'SEDAN','serviseType':'Car','cellPhone':'9988921071'}
		];
		var users={
			'id':1, 'CellPhone':'' , 'user_id': '', 'password': '', 'Email':'','Name':''
	};

   // window.localStorage.setItem("userdetail", JSON.stringify(reservations));
    var user = JSON.parse(window.localStorage.getItem("userdetail"));
	if($.isEmptyObject(user)){
	window.localStorage.setItem("userdetail", JSON.stringify(users));
	};
	
   

    callLater(successCallback);

}