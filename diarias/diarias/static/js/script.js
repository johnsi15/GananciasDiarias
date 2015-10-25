$(document).ready(function(){
	console.log('ready');
  /*Formatear valores numericos para que se vean como pesos*/
  var formatNumber = {
       separador: ".", // separador para los miles
       sepDecimal: ',', // separador para los decimales
         formatear:function (num){
         num +='';
         var splitStr = num.split('.');
         var splitLeft = splitStr[0];
         
         var regx = /(\d+)(\d{3})/;
         while (regx.test(splitLeft)) {
         splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
         }
         return this.simbol + splitLeft;
         },
       new:function(num, simbol){
       this.simbol = simbol ||'';
       return this.formatear(num);
       }
    }
    var valor = $('#valorNumerico').text();//ganancia 
    var valor2 = $('#valorNumerico2').text();//gasto
    $('#valorNumerico').text(formatNumber.new(valor, "$"));
    $('#valorNumerico2').text(formatNumber.new(valor2, "$"));
    var totalActual = valor - valor2;
    $('#totalActual').text(formatNumber.new(totalActual, "$"));

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
              success: function(data){
               // console.log(resp);
                if(data == "Error"){
                   console.log('Algo salio mal :(')
                }else{
                  var ganancia = $('#valorGanancia').val();//ganancia
                  var gasto = $('#valorGasto').val();//gasto
                  var valor = $('#ocultoGanancia').text();//ganancia 
                  var valor2 = $('#ocultoGasto').text();//gasto
                  $('#agregar_gananciaygasto_form')[0].reset();//borramos los datos del form 
                  $('#ventana1').modal('hide')//ocultamos el modal 
                  /*$('#FechaGananciasGastos').empty();//limpiamos la tabla */
                  var html = "";
                  var datos = JSON.parse(data);
                    //console.log(datos);
                  gananciaParse = parseInt(ganancia);
                  gastoParse = parseInt(gasto);
                  valorParse = parseInt(valor);
                  valor2Parse = parseInt(valor2);
                  var sumaGanancias = valorParse + gananciaParse;
                  var sumaGastos = valor2Parse + gastoParse;
                  totalActual = sumaGanancias - sumaGastos;
                  $('#ocultoGanancia').text(sumaGanancias);
                  $('#ocultoGasto').text(sumaGastos);
                  $('#valorNumerico').text(formatNumber.new(sumaGanancias, "$"));
                  $('#valorNumerico2').text(formatNumber.new(sumaGastos, "$"));
                  $('#totalActual').text(formatNumber.new(totalActual, "$"));
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
              success: function(data){
               // console.log(resp);
                if(data == "Error"){
                   console.log('Algo salio mal :(')
                }else{
                  var ganancia = $('#valorGanancia').val();//ganancia
                  var gasto = $('#valorGasto').val();//gasto
                  var valor = $('#ocultoGanancia').text();//ganancia 
                  var valor2 = $('#ocultoGasto').text();//gasto
                  $('#agregar_ganancia_form')[0].reset();//borramos los datos del form 
                  $('#ventana2').modal('hide')//ocultamos el modal 
                  /*$('#FechaGananciasGastos').empty();//limpiamos la tabla */
                  var html = "";
                  var datos = JSON.parse(data);
                    //console.log(datos);
                  gananciaParse = parseInt(ganancia);
                  gastoParse = parseInt(gasto);
                  valorParse = parseInt(valor);
                  valor2Parse = parseInt(valor2);
                  var sumaGanancias = valorParse + gananciaParse;
                  var sumaGastos = valor2Parse + gastoParse;
                  totalActual = sumaGanancias - sumaGastos;
                  $('#ocultoGanancia').text(sumaGanancias);
                  $('#ocultoGasto').text(sumaGastos);
                  $('#valorNumerico').text(formatNumber.new(sumaGanancias, "$"));
                  $('#valorNumerico2').text(formatNumber.new(sumaGastos, "$"));
                  $('#totalActual').text(formatNumber.new(totalActual, "$"));
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
              success: function(data){
               // console.log(resp);
                if(data == "Error"){
                  console.log('Algo salio mal :(')
                }else{
                  var ganancia = $('#valorGanancia').val();//ganancia
                  var gasto = $('#valorGasto').val();//gasto
                  var valor = $('#ocultoGanancia').text();//ganancia 
                  var valor2 = $('#ocultoGasto').text();//gasto
                  $('#agregar_gasto_form')[0].reset();//borramos los datos del form 
                  $('#ventana3').modal('hide')//ocultamos el modal 
                  /* $('#FechaGananciasGastos').empty();//limpiamos la tabla */
                  var html = "";
                  var datos = JSON.parse(data);
                    //console.log(datos);
                  gananciaParse = parseInt(ganancia);
                  gastoParse = parseInt(gasto);
                  valorParse = parseInt(valor);
                  valor2Parse = parseInt(valor2);
                  var sumaGanancias = valorParse + gananciaParse;
                  var sumaGastos = valor2Parse + gastoParse;
                  totalActual = sumaGanancias - sumaGastos;
                  $('#ocultoGanancia').text(sumaGanancias);
                  $('#ocultoGasto').text(sumaGastos);
                  $('#valorNumerico').text(formatNumber.new(sumaGanancias, "$"));
                  $('#valorNumerico2').text(formatNumber.new(sumaGastos, "$"));
                  $('#totalActual').text(formatNumber.new(totalActual, "$"));
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

/*_____________________________________________________________________________________________________________*/

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

/*modificamos todos los registros ganancias y gastos*/
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

/*ELIMINAMOS LOS REGISTROS GANANCIAS Y GASTOS*/
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

/*----------------------------------------------------------------------------------------------------------*/

/*____________________________Modificar solo la ganancia _____________________________________*/
$('#FechaGanancia' ).on("click","#modificarGanancia",function(){
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

$('#clickModificarGanancia').click(function(e){
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
                     if (datos[i].fields.ganancia > 0 && datos[i].fields.gasto >= 0){
                       html +='<tr><td id="idregistro">'+
                                          datos[i].pk+'</td><td>'+
                                          datos[i].fields.fecha+'</td><td>'+
                                          datos[i].fields.ganancia+'</td><td id="idregistro">'+
                                          datos[i].fields.gasto+'</td><td>'+
                                          datos[i].fields.nota+'</td>'+
                          '<td><a href=""  class="btn btn-info btn-sm" data-toggle="modal" data-target="#modificar" id="modificarGanancia"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a></td>'+
                          '<td><a href=""  class="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminar" id="eliminarGanancia"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Eliminar</a></td>'+
                       '</tr>'
                     };
                  };                  
                  $('#FechaGanancia').html(html);//mandamos los nuevos datos a la tabla
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


/*___________________________Eliminar solo la ganancias_________________________*/
$('#FechaGanancia' ).on("click","#eliminarGanancia",function(){
      /*var variable = */
      console.log('poraca pasamos bien.');
      //alert($(this).attr('href'));
      //estraemos los campos.
    $('#id_eliminar').val($(this).parent().parent().children('td:eq(0)').text());
    $("#titulo_eliminar").html($(this).parent().parent().children('td:eq(4)').text());
      //var url= $(this).attr('href');
});

$('#clickEliminarGanancia').click(function(e){
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
                     if (datos[i].fields.ganancia > 0 && datos[i].fields.gasto >= 0){
                       html +='<tr><td id="idregistro">'+
                                          datos[i].pk+'</td><td>'+
                                          datos[i].fields.fecha+'</td><td>'+
                                          datos[i].fields.ganancia+'</td><td id="idregistro">'+
                                          datos[i].fields.gasto+'</td><td>'+
                                          datos[i].fields.nota+'</td>'+
                          '<td><a href=""  class="btn btn-info btn-sm" data-toggle="modal" data-target="#modificar" id="modificarGanancia"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a></td>'+
                          '<td><a href=""  class="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminar" id="eliminarGanancia"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Eliminar</a></td>'+
                       '</tr>'
                     };
                  };                  
                  $('#FechaGanancia').html(html);//mandamos los nuevos datos a la tabla
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

/*---------------------------------------------------------------------------------------------------------*/

/*___________________Modificar solo el gasto___________________________*/
$('#FechaGasto' ).on("click","#modificarGasto",function(){
      /*var variable = */
      console.log('poraca pasamos bien.');
      //alert($(this).attr('href'));
      //estraemos los campos.
      $('#id_registro').val($(this).parent().parent().children('td:eq(0)').text());
      $('#fechaModificar').val($(this).parent().parent().children('td:eq(1)').text());
      $('#gastoMod').val($(this).parent().parent().children('td:eq(2)').text());
      $('#gananciaMod').val($(this).parent().parent().children('td:eq(3)').text());
      $('#notaMod').val($(this).parent().parent().children('td:eq(4)').text());
      //var url= $(this).attr('href');
});

$('#clickModificarGasto').click(function(e){
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
                     if (datos[i].fields.gasto > 0){
                       html +='<tr><td id="idregistro">'+
                                          datos[i].pk+'</td><td>'+
                                          datos[i].fields.fecha+'</td><td>'+
                                          datos[i].fields.gasto+'</td><td id="idregistro">'+
                                          datos[i].fields.ganancia+'</td><td>'+
                                          datos[i].fields.nota+'</td>'+
                          '<td><a href=""  class="btn btn-info btn-sm" data-toggle="modal" data-target="#modificar" id="modificarGasto"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a></td>'+
                          '<td><a href=""  class="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminar" id="eliminarGasto"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Eliminar</a></td>'+
                       '</tr>'
                     };
                  };                  
                  $('#FechaGasto').html(html);//mandamos los nuevos datos a la tabla
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


/*_____________________Eliminar solo gasto_______________________________*/
$('#FechaGasto' ).on("click","#eliminarGasto",function(){
      /*var variable = */
      console.log('poraca pasamos bien.');
      //alert($(this).attr('href'));
      //estraemos los campos.
    $('#id_eliminar').val($(this).parent().parent().children('td:eq(0)').text());
    $("#titulo_eliminar").html($(this).parent().parent().children('td:eq(4)').text());
      //var url= $(this).attr('href');
});

$('#clickEliminarGasto').click(function(e){
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
                     if (datos[i].fields.gasto > 0){
                       html +='<tr><td id="idregistro">'+
                                          datos[i].pk+'</td><td>'+
                                          datos[i].fields.fecha+'</td><td>'+
                                          datos[i].fields.gasto+'</td><td id="idregistro">'+
                                          datos[i].fields.ganancia+'</td><td>'+
                                          datos[i].fields.nota+'</td>'+
                          '<td><a href=""  class="btn btn-info btn-sm" data-toggle="modal" data-target="#modificar" id="modificarGasto"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a></td>'+
                          '<td><a href=""  class="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminar" id="eliminarGasto"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Eliminar</a></td>'+
                       '</tr>'
                     };
                  };                  
                  $('#FechaGasto').html(html);//mandamos los nuevos datos a la tabla
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