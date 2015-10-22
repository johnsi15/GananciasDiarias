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
              success: function(data){
                //console.log(resp);
                if(data == "Error"){
                 	 console.log('Algo salio mal :(')
                }else{
                   $('#agregar_nota_form')[0].reset();//limpiamos el formulario
                   $('#mensaje').modal('hide')
                   var html = "";
                   var datos = JSON.parse(data);
                    //console.log(datos);
                  for (var i = 0; i < datos.length; i++) {
                     /* console.log(datos[i].pk);*/
                     //console.log(datos[i].fields.fecha);
                     html +='<tr><td id="id_nota">'+
                                        datos[i].pk+'</td><td>'+
                                        datos[i].fields.fecha+'</td><td>'+
                                        datos[i].fields.titulo+'</td><td>'+
                                        datos[i].fields.nota+'</td>'+
                        '<td><a href=""  class="btn btn-info btn-sm" data-toggle="modal" data-target="#modificar" id="modificarNota"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a></td>'+
                        '<td><a href=""  class="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminar" id="eliminarNota"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Eliminar</a></td>'+
                     '</tr>'
                  };
                  /* $('#FechaTituloNota').empty();//limpiamos la tabla */
                   $('#FechaTituloNota').html(html);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeExitoso .alert").fadeOut(6000).fadeIn(6000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+'X'+'</button>'+'<strong>'+'Nota Guardada '+'</strong>'+' La nota se guardo Correctamente.'+'</div>';
                   $('#mensajeExitoso').html(exito);
                   /*$.getScript('/{{STATIC_URL}}/js/script.js/');*/
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
  $('#FechaTituloNota' ).on("click","#modificarNota",function(){
      /*var variable = */
      console.log('poraca pasamos bien.');

      //alert($(this).attr('href'));
      //estraemos los campos.
      $('#idnota').val($(this).parent().parent().children('td:eq(0)').text());
      $('#titulo').val($(this).parent().parent().children('td:eq(2)').text());
      $('#nota').val($(this).parent().parent().children('td:eq(3)').text());
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
                /* $('#FechaTituloNota').empty();//limpiamos la tabla */
                  var html = "";
                  var datos = JSON.parse(data);
                    //console.log(datos);
                  for (var i = 0; i < datos.length; i++) {
                     /* console.log(datos[i].pk);*/
                     //console.log(datos[i].fields.fecha);
                     html +='<tr><td id="id_nota">'+
                                        datos[i].pk+'</td><td>'+
                                        datos[i].fields.fecha+'</td><td>'+
                                        datos[i].fields.titulo+'</td><td>'+
                                        datos[i].fields.nota+'</td>'+
                        '<td><a href=""  class="btn btn-info btn-sm" data-toggle="modal" data-target="#modificar" id="modificarNota"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a></td>'+
                        '<td><a href=""  class="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminar" id="eliminarNota"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Eliminar</a></td>'+
                     '</tr>'
                  };                  
                  $('#FechaTituloNota').html(html);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeEditado .alert").fadeOut(6000).fadeIn(3000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+
                   'X'+'</button>'+'<strong>'+'Editado'+'</strong>'+' La nota se modifico Correctamente.'+'</div>';
                  $('#mensajeEditado').html(exito);//mensaje de exito
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
  $('#FechaTituloNota').on("click","#eliminarNota",function(e){
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
              /* $('#FechaTituloNota').empty();//limpiamos la tabla */
                  var html = "";
                  var datos = JSON.parse(data);
                    //console.log(datos);
                  for (var i = 0; i < datos.length; i++) {
                     /* console.log(datos[i].pk);*/
                     //console.log(datos[i].fields.fecha);
                     html +='<tr><td id="id_nota">'+
                                        datos[i].pk+'</td><td>'+
                                        datos[i].fields.fecha+'</td><td>'+
                                        datos[i].fields.titulo+'</td><td>'+
                                        datos[i].fields.nota+'</td>'+
                        '<td><a href=""  class="btn btn-info btn-sm" data-toggle="modal" data-target="#modificar" id="modificarNota"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a></td>'+
                        '<td><a href=""  class="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminar" id="eliminarNota"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Eliminar</a></td>'+
                     '</tr>'
                  };
                  $('#FechaTituloNota').html(html);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeEditado .alert").fadeOut(6000).fadeIn(3000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+
                   'X'+'</button>'+'<strong>'+'Eliminado'+'</strong>'+' La nota se eliminino Correctamente.'+'</div>';
                  $('#mensajeEditado').html(exito);//mensaje de exito
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



/*___________________________________________________________________*/
//modificar registros de las GANANCIAS Y LOS GASTOS
$('#modificar').on('shown.bs.modal', function(){
     $('#fechaModificar').focus();
})

//Extraer los datos de la tabla para mostrarlos en el form
$('#FechaGananciasGastos' ).on("click","#modificarRegistro",function(){
      /*var variable = */
      console.log('poraca pasamos bien.');

      //alert($(this).attr('href'));
      //estraemos los campos.
      $('#id_registro').val($(this).parent().parent().children('td:eq(0)').text());
      $('#fechaModificar').val($(this).parent().parent().children('td:eq(1)').text());
      $('#gananciaMod').val($(this).parent().parent().children('td:eq(2)').text());
      $('#gastoMod').val($(this).parent().parent().children('td:eq(3)').text());
      $('#notaMod').val($(this).parent().parent().children('td:eq(4)').text());
      //var url= $(this).attr('href');
});

$('#clickModificarRegistro').click(function(e){
        e.preventDefault();
        console.log('ok ready;');
        $.ajax({
              beforeSend: function(){

              },
              url: '/modificar/',
              type: 'POST',
              data: $('#modificar_registro_form').serialize(),
              success: function(data){
                //console.log(data);
                if(data == "Error"){
                  console.log('Algo salio mal :(')
                }else{
                 //$('#modificar_nota_form')[0].reset();//borramos los datos del form 
                 $('#modificar').modal('hide')//ocultamos el modal 
                /* $('#FechaTituloNota').empty();//limpiamos la tabla */
                  var html = "";
                  var datos = JSON.parse(data);
                    //console.log(datos);
                  for (var i = 0; i < datos.length; i++) {
                     /* console.log(datos[i].pk);*/
                     //console.log(datos[i].fields.fecha);
                     html +='<tr><td id="idregistro">'+
                                        datos[i].pk+'</td><td>'+
                                        datos[i].fields.fecha+'</td><td>'+
                                        datos[i].fields.ganancia+'</td><td>'+
                                        datos[i].fields.gasto+'</td><td>'+
                                        datos[i].fields.nota+'</td>'+
                        '<td><a href=""  class="btn btn-info btn-sm" data-toggle="modal" data-target="#modificar" id="modificarRegistro"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a></td>'+
                        '<td><a href=""  class="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminar" id="eliminarRegistro"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Eliminar</a></td>'+
                     '</tr>'
                  };                  
                  $('#FechaGananciasGastos').html(html);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeEditado .alert").fadeOut(6000).fadeIn(3000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+
                   'X'+'</button>'+'<strong>'+'Editado'+'</strong>'+' El registro se modifico correctamente.'+'</div>';
                  $('#mensajeEditado').html(exito);//mensaje de exito
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

/*_________________________________________________________________________________*/
/*ELIMINAMOS LOS REGISTROS*/
//Extraer los datos de la tabla para mostrarlos en el form
$('#FechaGananciasGastos' ).on("click","#eliminarRegistro",function(){
      /*var variable = */
      console.log('poraca pasamos bien.');

      //alert($(this).attr('href'));
      //estraemos los campos.
    $('#id_eliminar').val($(this).parent().parent().children('td:eq(0)').text());
    $("#titulo_eliminar").html($(this).parent().parent().children('td:eq(4)').text());
      //var url= $(this).attr('href');
});


  $('#clickEliminarRegistro').click(function(e){
        e.preventDefault();
        console.log('ok ready;');
        $.ajax({
              beforeSend: function(){

              },
              url: '/eliminar/',
              type: 'POST',
              data: $('#eliminar_nota_form').serialize(),
              success: function(data){
                //console.log(data);
                if(data == "Error"){
                  console.log('Algo salio mal :(')
                }else{
                 //$('#modificar_nota_form')[0].reset();//borramos los datos del form 
                 $('#eliminar').modal('hide')//ocultamos el modal 
                /* $('#FechaTituloNota').empty();//limpiamos la tabla */
                  var html = "";
                  var datos = JSON.parse(data);
                    //console.log(datos);
                  for (var i = 0; i < datos.length; i++) {
                     /* console.log(datos[i].pk);*/
                     //console.log(datos[i].fields.fecha);
                     html +='<tr><td id="idregistro">'+
                                        datos[i].pk+'</td><td>'+
                                        datos[i].fields.fecha+'</td><td>'+
                                        datos[i].fields.ganancia+'</td><td>'+
                                        datos[i].fields.gasto+'</td><td>'+
                                        datos[i].fields.nota+'</td>'+
                        '<td><a href=""  class="btn btn-info btn-sm" data-toggle="modal" data-target="#modificar" id="modificarRegistro"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a></td>'+
                        '<td><a href=""  class="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminar" id="eliminarRegistro"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Eliminar</a></td>'+
                     '</tr>'
                  };                  
                  $('#FechaGananciasGastos').html(html);//mandamos los nuevos datos a la tabla
                    setTimeout(function(){ $("#mensajeEditado .alert").fadeOut(6000).fadeIn(3000).fadeOut(900).fadeIn(800).fadeOut(600);}, 800); 
                   var exito = '<div class="alert alert-success">'+'<button type="button" class="close" data-dismiss="alert">'+
                   'X'+'</button>'+'<strong>'+'Eliminado'+'</strong>'+' El registro se elimino correctamente.'+'</div>';
                  $('#mensajeEditado').html(exito);//mensaje de exito
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