/*functions.js
Have al callable functions*/


funcsGoogleAnalytic ={
	success : function (param)
	{
		// alert('Google analytic success');
	},

		error : function(params)
	{
		//alert('Google analytic failed');

	}
};



funcsSync={
	start : function ()
	{},
	end : function ()
	{
		// alert('Synchin ended');
		//syncServer=false;
		// $('#mesg').hide();
		// $('#synchin').text('');
	}, 
	deletePaxList : function ()
	{
		if(!$.isEmptyObject(db))
		{	
		            db.transaction(function(tx) {
				      tx.executeSql('DELETE FROM tb_passengesr ' );
			        },errorHandler,successCallBack);

					
		}

	}
}


function syncData(table_name,data)
{
	 var temp_obj;
 
	 switch(table_name)
	 {
	   
	    case 'routeList':

		
		//truncate the table routes first
		
		if(!$.isEmptyObject(db))
		{
		
		   /*db.transaction(function(tx){
		     tx.executeSql('DELETE FROM tb_routes');
		   },errorHandler,successCallBack);*/
		   
		   
		   var routelist_json_data = JSON.stringify(data);
		   
		   //alert('routelist_json_data='+routelist_json_data);
		   
		   var qry = "INSERT INTO tb_routes(data) VALUES('"+routelist_json_data+"')";
		   
		   
		   db.transaction(function(tx) {
			         tx.executeSql(qry);
			        },errorHandler,successCallBack);
			


			
         db.transaction(function(tx) {
			tx.executeSql("SELECT data from tb_routes", [], function(tx, res) {
			//console.log("res.rows.length: " + res.rows.length + " -- should be 1");
			//alert("res.rows.item(0).data: " + res.rows.item(0).data + " -- should be guru");
			var names=[];
			for(var c=0 ; c < res.rows.length ;c++)
			 {
				names.push(JSON.parse(res.rows.item(c).data));
			 }
			//alert("res.rows.item(0).paxnames" + res.rows.item(0).paxnames);
			//var json_data = JSON.stringify(res);

				//alert(names.join());
			});
			},errorHandler,successCallBack);	
		
		}
		
        break;	

        case 'pax_list':
		
		var json_data1 = JSON.stringify(data);
		
		listRoute=data.PaxListOut[0].Route.replace(/\s/g , "+");

        listClient=data.PaxListOut[0].Client.replace(/\s/g , "+");

	    listProviderID=data.PaxListOut[0].ProviderID.replace(/\s/g , "+");
		
		
		var route_number = parseInt(data.PaxListOut[0]['Route']);
		
		console.log(typeof route_number+"  "+route_number);
		
		var json_data = JSON.stringify(data);
		$('#synchin').text('');
		$('#mesg').hide();
		if(!$.isEmptyObject(db))
		{	
		            db.transaction(function(tx) {
				     //  tx.executeSql('DELETE FROM tb_passengesr Where route_id='+route_number );
			          tx.executeSql("INSERT INTO tb_passengesr(pax_list, route_id) VALUES('"+json_data+"',"+route_number+")");
			        },errorHandler,successCallBack);

					
		}
		break;

		case 'checkinsync':
	
		var PaxNames = JSON.stringify(data.PaxNames);
// alert('R='+ data.Route + 'P='+data.ProviderID);
        if(!$.isEmptyObject(db))
		{

			db.transaction(function(tx)
			{
						 tx.executeSql("INSERT INTO tb_checkinsync(provider_id, route_id,paxnames,checkin_time) VALUES('"+data.ProviderID+"',"+data.Route+",'"+data.PaxNames+"','"+data.CheckedInAt+"')");
			},errorHandler,function()
			 {
			    $('#checkIn').text('Submit').attr('disabled',false);
				if($('input:checkbox[name="list[]"]').is(':checked'))
				{                             
				  $('label').removeClass('selected');
				  $('span').removeClass('selected');
				  $('#mesg').slideDown(1000);
                  $("html, body").animate({ scrollTop: 0 }, 600); 
				  $('#mesg-recvd').text('Check In Time Updated').css('color', 'green');
				  $('#mesg').fadeOut(7000);
				  $('#sel-vals')[0].reset(); 			
				}
			 }			
			);

	    }

		break;
	 } 
	 	

}



function isSameDateLogin()
{

    var user_detail = JSON.parse(window.localStorage.getItem("userdetail"));
	//console.log(user_detail);
			   if(typeof(user_detail.sessionDate) !== 'undefined' && user_detail.sessionDate!= '')
			   {
				   console.log('#funs #169');
				   	storDate = user_detail.sessionDate ; // 'Wed Jan 01 2015 11:14:50' ;
					var oneDayMiliSecs = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
					var now = new Date();
					Dat=new Date(Date.parse(storDate));
					var diffDays = Math.round(Math.abs((now.getTime() - Dat.getTime()) / (oneDayMiliSecs)));
					if(diffDays == 0) 	{ return true; } 
					else
					{	
							return false;
						  
					}
			   }
			   return false;
}

function logoutOnSessionDate()
{
					  if(isSameDateLogin() == false)
		{
							console.log('#funs #179');
							var users={'user_id':'','password':'' , 'sessionDate': '' };
							window.localStorage.setItem("userdetail", JSON.stringify(users));

							var users = JSON.parse(window.localStorage.getItem("userdetail"));
							$('body').html(new HomeView(self.store).renderP(HomeView.template,users).el);
							return false;
	  }
}