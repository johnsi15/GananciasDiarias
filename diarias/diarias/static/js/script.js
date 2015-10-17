$(document).ready(function(){
	console.log('ready');

  /*focus del click del mouse*/
	$('#mensaje').on('shown.bs.modal', function(){
	   $('#titulo').focus();
	})
  /*este focus se uso en la misma ventada de modificar y eliminar*/
  $('#mensaje').on('shown.bs.modal', function(){
     $('#AgregarTitulo').focus();
  })

	$('#ventana1').on('shown.bs.modal', function(){
		  $('#fecha').focus();
	})

	$('#ventana2').on('shown.bs.modal', function(){
	   $('#fecha_ganancia').focus();
	})

	$('#ventana3').on('shown.bs.modal', function(){
	   $('#fecha_gasto').focus();
	})
/*Guardar notas rapidas con ajax*/
			$('#agregarNota').click(function(e){
				e.preventDefault();
				console.log('ok ready;');
				$.ajax({
              beforeSend: function(){

              },
              url: '/agregarAjax/',
              type: 'POST',
              data: $('#agregar_nota_form').serialize(),
              success: function(resp){
                //console.log(resp);
                if(resp == "Error"){
                 	 console.log('Algo salio mal :(')
                }else{
                   $('#agregar_nota_form')[0].reset();
                   $('#mensaje').modal('hide')
                   $('#FechaTituloNota').empty();//limpiamos la tabla 
                   $('#FechaTituloNota').html(resp);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeExitoso .alert").fadeOut(6000).fadeIn(6000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+'X'+'</button>'+'<strong>'+'Nota Guardada '+'</strong>'+' La nota se guardo Correctamente.'+'</div>';
                   $('#mensajeExitoso').html(exito);
                }
              },
              error: function(jqXHR,estado,error){
                  console.log(estado);
                  console.log(error);
              },
              complete: function(jqXHR,estado){
                  console.log(estado);
              },
              timeout: 10000//10 segundos.
        });/*Cierre del ajax*/
			});/*Cierre de la funtion click*/

    /*Agregar ganancia y gasto al mismo tiempo */
    $('#agregarGananciGasto').click(function(e){
        e.preventDefault();
        console.log('ok ready;');
        $.ajax({
              beforeSend: function(){

              },
              url: '/registrar/',
              type: 'POST',
              data: $('#agregar_gananciaygasto_form').serialize(),
              success: function(resp){
               // console.log(resp);
                if(resp == "Error"){
                   console.log('Algo salio mal :(')
                }else{
                  $('#agregar_gananciaygasto_form')[0].reset();//borramos los datos del form 
                  $('#ventana1').modal('hide')//ocultamos el modal 
                  $('#FechaGananciasGastos').empty();//limpiamos la tabla 
                  $('#FechaGananciasGastos').html(resp);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeExitoso .alert").fadeOut(6000).fadeIn(6000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+
                   'X'+'</button>'+'<strong>'+'Ganancia Y Gasto '+'</strong>'+' La Ganancia y el Gasto se Guardo Correctamente.'+'</div>';
                   $('#mensajeExitoso').html(exito);//mensaje de exito
                }
              },
              error: function(jqXHR,estado,error){
                  console.log(estado);
                  console.log(error);
              },
              complete: function(jqXHR,estado){
                  console.log(estado);
              },
              timeout: 10000//10 segundos.
        });/*Cierre del ajax*/
      });/*Cierre de la funtion click*/

    /*Agregar solo ganancia*/
    $('#agregarGanancia').click(function(e){
        e.preventDefault();
        console.log('ok ready;');
        $.ajax({
              beforeSend: function(){

              },
              url: '/registrar/',
              type: 'POST',
              data: $('#agregar_ganancia_form').serialize(),
              success: function(resp){
               // console.log(resp);
                if(resp == "Error"){
                   console.log('Algo salio mal :(')
                }else{
                  $('#agregar_ganancia_form')[0].reset();//borramos los datos del form 
                  $('#ventana2').modal('hide')//ocultamos el modal 
                  $('#FechaGananciasGastos').empty();//limpiamos la tabla 
                  $('#FechaGananciasGastos').html(resp);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeExitoso .alert").fadeOut(6000).fadeIn(6000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+
                   'X'+'</button>'+'<strong>'+'Ganancia'+'</strong>'+' La Ganancia se Guardo Correctamente.'+'</div>';
                   $('#mensajeExitoso').html(exito);//mensaje de exito
                }
              },
              error: function(jqXHR,estado,error){
                  console.log(estado);
                  console.log(error);
              },
              complete: function(jqXHR,estado){
                  console.log(estado);
              },
              timeout: 10000//10 segundos.
        });/*Cierre del ajax*/
    });/*Cierre de la funtion click*/

 /*Agregar solo gasto*/
    $('#agregarGasto').click(function(e){
        e.preventDefault();
        console.log('ok ready;');
        $.ajax({
              beforeSend: function(){

              },
              url: '/registrar/',
              type: 'POST',
              data: $('#agregar_gasto_form').serialize(),
              success: function(resp){
               // console.log(resp);
                if(resp == "Error"){
                  console.log('Algo salio mal :(')
                }else{
                  $('#agregar_gasto_form')[0].reset();//borramos los datos del form 
                  $('#ventana3').modal('hide')//ocultamos el modal 
                  $('#FechaGananciasGastos').empty();//limpiamos la tabla 
                  $('#FechaGananciasGastos').html(resp);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeExitoso .alert").fadeOut(6000).fadeIn(3000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+
                   'X'+'</button>'+'<strong>'+'Gasto'+'</strong>'+' El Gasto se Guardo Correctamente.'+'</div>';
                  $('#mensajeExitoso').html(exito);//mensaje de exito
                }
              },
              error: function(jqXHR,estado,error){
                  console.log(estado);
                  console.log(error);
              },
              complete: function(jqXHR,estado){
                  console.log(estado);
              },
              timeout: 10000//10 segundos.
        });/*Cierre del ajax*/
    });/*Cierre de la funtion click*/


/*_____________________________________________________________________________________________*/
/*modificar notas rapidas*/
  $('#modificar').on('shown.bs.modal', function(){
     $('#titulo').focus();
  })

 //Extraer los datos de la tabla para mostrarlos en el form
  $('#FechaTituloNota #modificarNota').click(function(e){
      /*var variable = */
      console.log('poraca pasamos bien.');

      //alert($(this).attr('href'));
      //estraemos los campos.
      var variable1 = $('#idnota').val($(this).parent().parent().children('td:eq(0)').text());
      var variable2= $('#titulo').val($(this).parent().parent().children('td:eq(2)').text());
      var variable3 = $('#nota').val($(this).parent().parent().children('td:eq(3)').text());
      console.log(variable1);
      console.log(variable2);
      console.log(variable3);
      //var url= $(this).attr('href');
  });

  $('#clickModificarNota').click(function(e){
        e.preventDefault();
        console.log('ok ready;');
        $.ajax({
              beforeSend: function(){

              },
              url: '/ver-notas-rapidas/',
              type: 'POST',
              data: $('#modificar_nota_form').serialize(),
              success: function(data){
                //console.log(data);
                if(data == "Error"){
                  console.log('Algo salio mal :(')
                }else{
                 //$('#modificar_nota_form')[0].reset();//borramos los datos del form 
                 $('#modificar').modal('hide')//ocultamos el modal 
                 $('#FechaTituloNota').empty();//limpiamos la tabla 
                  $('#FechaTituloNota').html(data);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeExitoso .alert").fadeOut(6000).fadeIn(3000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+
                   'X'+'</button>'+'<strong>'+'Editado'+'</strong>'+' La nota se modifico Correctamente.'+'</div>';
                  $('#mensajeExitoso').html(exito);//mensaje de exito
                }
              },
              error: function(jqXHR,estado,error){
                  console.log(estado);
                  console.log(error);
              },
              complete: function(jqXHR,estado){
                  console.log(estado);
              },
              timeout: 10000//10 segundos.
        });/*Cierre del ajax*/
    });/*Cierre de la funtion click*/


/*______________________________________________________________________________________*/
/*Elminar las notas rapidas */
//Extraer los datos de la tabla para mostrarlos en el form
  $('#FechaTituloNota #eliminarNota').click(function(e){
      /*e.preventDefault();*/
      console.log('poraca pasamos bien.');
      //extraemos el id de la nota que vamos a eliminar
      $('#ideliminar').val($(this).parent().parent().children('td:eq(0)').text());
      $("#titulo_eliminar").html($(this).parent().parent().children('td:eq(2)').text());
  });

   $('#clickEliminarNota').click(function(e){
        e.preventDefault();
        console.log('ok ready;');
        $.ajax({
              beforeSend: function(){

              },
              url: '/eliminarNota/',
              type: 'POST',
              data: $('#eliminar_nota_form').serialize(),
              success: function(data){
                //console.log(data);
                if(data == "Error"){
                  console.log('Algo salio mal :(')
                }else{
                 //$('#eliminar_nota_form')[0].reset();//borramos los datos del form 
                 $('#eliminar').modal('hide')//ocultamos el modal 
                 $('#FechaTituloNota').empty();//limpiamos la tabla 
                  $('#FechaTituloNota').html(data);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeExitoso .alert").fadeOut(6000).fadeIn(3000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+
                   'X'+'</button>'+'<strong>'+'Eliminado'+'</strong>'+' La nota se eliminino Correctamente.'+'</div>';
                  $('#mensajeExitoso').html(exito);//mensaje de exito
                }
              },
              error: function(jqXHR,estado,error){
                  console.log(estado);
                  console.log(error);
              },
              complete: function(jqXHR,estado){
                  console.log(estado);
              },
              timeout: 10000//10 segundos.
        });/*Cierre del ajax*/
    });/*Cierre de la funtion click*/
  

});/*Cierre del document*/