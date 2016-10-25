$(function() {
    $('#nuevo_admin_form').submit(function (event) {
        event.preventDefault();
        $('.ac_p_error').fadeOut('slow').remove();
        var postData = $(this).serializeArray();
        $.ajax({
            type: 'POST',
            url: js_site_url + 'nuevo_admin/',
            data: postData,
            beforeSend:function(){
            	$('#div_waiting_new_admin').removeClass("hidden");            	
            },
            success: function (msg){
                if (isNaN(msg)) {
                	$('#div_waiting_new_admin').addClass("hidden");  
                    $.each(msg, function (i, item) {
                        $('#div_' + i).after('<p class="alert alert-danger text-center ac_p_error" role="alert">' + item + '</p>');
                    });
                } else {
                    if (msg == 1) {    
                    	swal({   
                    		title: "",   
                    		text: "Se insertó exitosamente el administrador",   
                    		type: "success"                 
                    	}, 
                    	function(){   
                    		location.reload(); 
                    	});                    	
                        $('#modal_add_admin').modal('hide');
                    } else {
                    	$('#div_waiting_new_admin').addClass("hidden"); 
                    	swal("Error", "Se ha presentado un error al ingresar el administrador", "error");
                    }
                }
            }
        });
    });
});