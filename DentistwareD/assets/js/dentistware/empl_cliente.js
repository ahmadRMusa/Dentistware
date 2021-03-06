$(function() {
    $('#nuevo_cliente_form').submit(function (event) {
        event.preventDefault();
        $('.ac_p_error').fadeOut('slow').remove();
        var postData = new FormData(this); 
        $.ajax({
            type: 'POST',
            url: js_site_url + 'nuevo_cliente/',
            data: postData,
            processData: false,
            contentType: false,
            beforeSend:function(){
            	$('#div_waiting_new_cliente').removeClass("hidden");            	
            },
            success: function (msg) {
               
                if (isNaN(msg)) {
                	$('#div_waiting_new_cliente').addClass("hidden");  
                    $.each(msg, function (i, item) {
                        $('#div_' + i).after('<p class="alert alert-danger text-center ac_p_error" role="alert">' + item + '</p>');
                    });
                } else {
                    if (msg == 1) {    
                    	swal({   
                    		title: "",   
                    		text: "Se insertó exitosamente el cliente",   
                    		type: "success"                 
                    	}, 
                    	function(){   
                    		location.reload(); 
                    	});                    	
                        $('#modal_add_client').modal('hide');
                    } else {
                    	$('#div_waiting_new_cliente').addClass("hidden"); 
                    	swal("Error", "Se ha presentado un error al ingresar el cliente", "error");
                    }
                }
            }
        });
    });
    
	$('#edit_cliente_form').submit(function (event) {
        event.preventDefault();
        $('.ac_p_error').fadeOut('slow').remove();
        var postData = new FormData(this); 
        $.ajax({
            type: 'POST',
            url: js_site_url + 'edit_cliente/',
            data: postData,
            processData: false,
            contentType: false,
            beforeSend:function(){
            	$('#div_waiting_edit_cliente').removeClass("hidden");            	
            },
            success: function (msg) {
                if (isNaN(msg)) {
                	$('#div_waiting_edit_cliente').addClass("hidden");   
                    $.each(msg, function (i, item) {
                        $('#div_' + i).after('<p class="alert alert-danger text-center ac_p_error">' + item + '</p>');
                    });
                    $("#error-doc").fadeOut('slow').remove();
                } else {
                    if (msg == 1) {    
                    	swal({   
                    		title: "Editado",   
                    		text: "Se actualizó correctamente el cliente!",   
                    		type: "success"                 
                    	}, 
                    	function(){
                    		location.href = js_site_url; 
                    	});              
                    } else {
                    	$('#div_waiting_edit_cliente').addClass("hidden");
                    	swal("Error", "Se ha presentado un error al editar éste cliente, por favor verifique los datos!", "error");
                    }
                }
            }
        });
    });
	
    $('.borrar-btn').click(function(e) {
        e.preventDefault();
        var documento = $(this).attr('doc');
        if(documento == "null"){
            swal("Error", "Usted no puede eliminar a este usuario", "error");
        } else {
            swal({
                title: 'Eliminar',
                text: '¿Desea eliminar a este cliente?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: "btn-primary",
                cancelButtonClass: "btn-danger",
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar',
                showLoaderOnConfirm: true,
            },
            function(isConfirm) {
                  if (isConfirm) {
                      $.ajax({
                        type: 'GET',
                        url: js_site_url + 'eliminar_usuario/' + documento,
                        success: function(msg){
                            if(msg == true){
                                swal({   
                                    title: "Eliminado",
                                    text: "El cliente ha sido eliminado",
                                    type: "success",
                                }, 
                                function(){   
                                    location.reload(); 
                                });
                            } else {
                                swal("Error", "Éste cliente no puede ser eliminado", "error");
                            }
                        }
                    });
                }
            });       
        }
    });
    
    $('.multa-btn').click(function(e) {
        e.preventDefault();
        var documento = $(this).attr('doc');
        $.ajax({
            type: 'POST',
            url: js_site_url + 'seleccionar_cliente/',
            data: {
                id: documento
            },
            success: function(){
                window.location.href = js_site_url + 'Multas_View/';
            }
        });
    });
    
    $('.volver-btn').click(function(e) {
        e.preventDefault();
        window.location.href = js_site_url + "liberar_cliente";
    });
    
    $('.editar-btn').click(function(e) {
        e.preventDefault();
        var documento = $(this).attr('doc');
        if(documento == "null"){
            swal("Error", "Este cliente no puede ser editado!", "error");
        } else {
            $.ajax({
                type: 'POST',
                url: js_site_url + 'seleccionar_cliente/',
                data: {
                    id: documento
                },
                success: function(){
                    window.location.href = js_site_url + 'Edit_View/';
                }
            });
        }
    });
    
	$(".cancel-btn").click(function (e) {
		$("#foto_img").removeAttr('src');
		$("#foto_img").addClass("hidden");
		$("#i_foto").removeClass("hidden");
		$("form")[0].reset();
        $(".modal").modal('hide');
        $(".alert").remove();
        $(".form-group").removeClass('has-error');        
	});
	
	$("#inputFoto").change(function () {
		var photoFile = document.getElementById("inputFoto").files[0];
		var photoPreview = document.getElementById("foto_img");
		var photoIcon = document.getElementById("i_foto");
		var imageType = /image.*/;
		
		if(photoFile){
			var preload = new Image();
			var reader = new FileReader();
			
	        if (!photoFile.type.match(imageType)) {
	        	swal('','El archivo selecionado no es un archivo de imagen valido.', 'error');
	        	$('#inputFoto').val('');	
				$(photoPreview).addClass("hidden");
				$(photoIcon).removeClass("hidden");
	            return false;
	        }
            if (parseFloat(photoFile.size / 20480).toFixed(2) > 20480) {
	        	swal('','La imagen seleccionada tiene un tamaño mayor a 20 MB', 'error');
	        	$('#inputFoto').val('');	
				$(photoPreview).addClass("hidden");
				$(photoIcon).removeClass("hidden");
	            return false;
	        }
            reader.onload = (function (aImg) {
	            return function (e) {
	                aImg.src = e.target.result;
	            };
	        })(preload);
	        reader.readAsDataURL(photoFile);
	        
	        preload.onload = function () {
	            $(photoPreview).attr('src', this.src);
				$(photoPreview).removeClass("hidden");
				$(photoIcon).addClass("hidden");
	        };
		} else {
			$(photoPreview).addClass("hidden");
			$(photoIcon).removeClass("hidden");
		}
	});
	
    $('#select_depto').change(function () {
        var idDepartamento = $(this).val();
        $("#select_ciudades > option").remove();
        if (idDepartamento != -1) {
            $.ajax({
                type: "GET",
                url: js_site_url + "listar_ciudades/" + idDepartamento,
                success: function (ciudades){
                    $.each(ciudades, function (id_ciudad, nombre_ciudad){
                        var opt = $('<option />');
                        opt.val(id_ciudad);
                        opt.text(nombre_ciudad);
                        $('#select_ciudades').append(opt);
                    });
                    $('#select_ciudades').prop('disabled', false);
                }
            });
        } else {
            var opt = $('<option />').val('-1').text('Seleccione un departamento');
            $('#select_ciudades').append(opt);
            $('#select_ciudades').prop('disabled', true);
            return false;
        }
     });
    
    $('.estado_multa').on('ifChecked', function(event){
    	var id_multa = $(this).attr("value");
        event.preventDefault();
        $('.ac_p_error').fadeOut('slow').remove();
        $.ajax({
            type: 'GET',
            url: js_site_url + 'update_estado_multa/' + id_multa,
            success: function (msg) { 
	            if (msg == 1) {    
	            	swal({   
	            		title: "",   
	            		text: "La multa ha sido pagada!",   
	            		type: "success"                 
	            	},
	            	function(){
	            		location.reload();
	            	}
	            	);                    	
	            } else {
	            	swal("Error", "Se ha presentado un error al intentar pagar la multa<br>Por favor vuelva a intentarlo!", "error");
	            }            
            }
        });
    });
     
    $.fn.datepicker.defaults.format = "yyyy/mm/dd";
 	$.fn.datepicker.dates["es"] = {
 		days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
 		daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
 		daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
 		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
 		monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
 		today: "Hoy"
 	};
 	
     
     $(".date-select").datepicker({
         language: "es",
         autoclose: true,
         endDate: "0d",
         todayHighlight: true,
         daysOfWeekHighlighted: "0",
     }).on(
         "show", function() {
             var zIndexModal = $(".modal-add").css("z-index");
             var zIndexFecha = $(".datepicker").css("z-index");
             $(".datepicker").css("z-index",zIndexModal+1);
     });

     $(".tabla-usuario").DataTable({
 	    "language":{
 		    "info": "Mostrando un total de _TOTAL_ registros",
 		    "infoThousands": ",",
 		},
 		"paging": false,
 		"info": true,
 		"searching": false,
         "ordering": true,
         "autoWidth": false,
     });
	
    $("#chkEliminarFoto").iCheck({
		"checkboxClass": "icheckbox_square-blue",
    });
    
    $(".estado_multa").iCheck({
		"checkboxClass": "icheckbox_square-blue",
    });
});
