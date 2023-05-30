
user = document.getElementById("usuario__id");
contrasena = document.getElementById("contrasena__id");
conf__contrasena = document.getElementById("contrasena2__id");
nombre = document.getElementById("nombre__id");
fecha__nacimiento = document.getElementById("fecha__nacimiento__id");
email = document.getElementById("email__id");
pfp = document.getElementById("pfp__id");
enviar = document.getElementsByClassName("enviar__boton");
errores = [];

lista_vacia = [];
if ( localStorage.getItem ("personas") == null) {
    localStorage.setItem ("personas", JSON.stringify ( lista_vacia ) );
}

$(".errores").hide();
function cerrar_mensaje_errores(){
    $(".errores").hide();
    $(".error").remove();
}

function registro(){

    errores = [];
    var parrafo = document.getElementById("mensaje_error"); 

    validar_contrasena(contrasena.value);

    if (contrasena.value != conf__contrasena.value){
        errores.push( "No coinciden las contraseñas" );
    }

    validar_usuario(user.value);
    validar_correo(email.value);
    check = document.getElementById('condicion').checked;
    if ( !check) {
        errores.push( "No ha aceptado nuestras condiciones de uso");
    }
    if (fecha__nacimiento.value.length == 0){
        errores.push( "No has introducido tu fecha de nacimiento");
    }
    if (errores.length != 0){
        $(".errores").show();
        for (i = 0; i < errores.length ; i++){
            var h3_errores = document.createElement("h3");
            h3_errores.textContent = errores[i];
            h3_errores.className = "error";
            parrafo.appendChild(h3_errores);
        }
    }
    
    else{ 

        localStorage.setItem( "usuario",  user.value);
        localStorage.setItem( "contrasena", contrasena.value);
        localStorage.setItem( "nombre",  nombre.value);
        localStorage.setItem( "nacimiento",  fecha__nacimiento.value);
        localStorage.setItem( "email",  email.value);
        localStorage.setItem( "pfp",  pfp.value);
        localStorage.setItem( "like", JSON.stringify ( [] ));
        localStorage.setItem( "play_list", JSON.stringify ( [] ));
        localStorage.setItem( "follow", JSON.stringify ( [] ));

        var persona = {
            nombreCompleto: nombre.value,
            nombreUsuario: user.value,
            contrasenaUsuario: contrasena.value,
            fechaNacimiento: fecha__nacimiento.value,
            emailUsuario: email.value,
            pfpUsuario: pfp.value,
            like: [],
            play_list: [],
            follow: [] 
        };

        personas.push (persona);
        localStorage.setItem ("personas", JSON.stringify ( personas ) );

        window.location.href = "home.html";
        actualizar__cabecera()

    }

}

function sesion() {
    errores = [];
    var parrafo = document.getElementById("mensaje_error");
    personas = JSON.parse( localStorage.getItem ( "personas" ));
    persona_encontrada = ""
    for (let i = 0; i<personas.length; i++) {
        if (user.value == personas[i].nombreUsuario) {
            persona_encontrada = personas[i]
        }
    }
    if (persona_encontrada == "") {
        errores.push("No esta registrado ese nombre de usuario");
    }
    else {
        if (persona_encontrada.contrasenaUsuario != contrasena.value){
            errores.push("La contraseña no coincide");
        }
    }

    if (errores.length != 0){
        $(".errores").show();
        for (i = 0; i < errores.length ; i++){
            var h3_errores = document.createElement("h3");
            h3_errores.textContent = errores[i];
            h3_errores.className = "error";
            parrafo.appendChild(h3_errores);
        }
    }
    else {
        localStorage.setItem( "usuario", persona_encontrada.nombreUsuario );
        localStorage.setItem( "contrasena", persona_encontrada.contrasenaUsuario );
        localStorage.setItem( "nombre", persona_encontrada.nombreCompleto );
        localStorage.setItem( "nacimiento", persona_encontrada.fechaNacimiento );
        localStorage.setItem( "email", persona_encontrada.emailUsuario );
        localStorage.setItem( "pfp",  persona_encontrada.pfpUsuario );
        localStorage.setItem( "like", persona_encontrada.like );
        localStorage.setItem( "play_list", persona_encontrada.play_list );
        localStorage.setItem( "follow", persona_encontrada.follow );

        window.location.href = "home.html";
        actualizar__cabecera()
    }
}

$(".ventana_cerrar_sesion").hide();
function esconder_mensaje(){
    $(".ventana_cerrar_sesion").hide();
}

function aparecer_mensaje(){
    $(".ventana_cerrar_sesion").show();
}


function cerrar_sesion(){
        guardar_modificado(localStorage.getItem( "usuario" ));
        localStorage.setItem( "usuario", "");
        localStorage.setItem( "contrasena", "");
        localStorage.setItem( "nombre", "");
        localStorage.setItem( "nacimiento", "");
        localStorage.setItem( "email", "");
        localStorage.setItem( "pfp", "");
        localStorage.setItem( "like", "");
        localStorage.setItem( "play_list", "");
        window.location.href = "home.html";
        actualizar__cabecera();
}

function actualizar_pagina(){
    let x = document.getElementsByClassName('boton__cancion');
    for (i = 0; i < x.length; i++) { 
        x[i].style.display="none";
    }
    actualizar__cabecera();
    $(".reproductor").hide();

}

function actualizar__cabecera(){
    nombre_introducido = localStorage.getItem("usuario") 
    if (nombre_introducido == "" || nombre_introducido == null){
        /*Cuando no está iniciada la sesión*/
        $(".iniciada").hide()
        $(".no_iniciada").show()
        $(".main__footer").show()
    }
    else {
        /* Cuando está iniciada la sesión*/
        $(".iniciada").show()
        $(".no_iniciada").hide()
        $(".main__footer").hide()
        const nombre_header = document.getElementById("nombre_header");
        nombre_header.innerHTML = nombre_introducido;
        imagen = localStorage.getItem("pfp");
        if (imagen != null && imagen != ""){
            document.getElementById("imagen_perfil").src = imagen;
        }
        else {
            document.getElementById("imagen_perfil").src = "/images/foto_perfil.webp";
        }
    }
}


function modificar(clase){
    elemento = clase.substring(0, clase.length - 13)
    elemento_id = elemento + "__id"
    var variable_mod = document.getElementById(elemento_id).value;
    errores = ""
    if (elemento == "usuario") {
        errores = validar_usuario(variable_mod)
    }
    if (elemento == "contrasena") {
        errores = validar_contrasena(variable_mod)
    }
    if (elemento == "email") {
        errores = validar_correo(variable_mod)
    }
    if (variable_mod == null || variable_mod == ""){
        console.log(variable_mod)
        errores = "Porfavor, introduce una modificación"
    }
    if (errores == "") { /*No fallos, modificamos*/
        parrafo = document.getElementById("errores");
        parrafo.innerHTML = "Dato modificado";
        user = localStorage.getItem("usuario")
        localStorage.setItem(elemento , variable_mod);
        guardar_modificado(user);
        completar_cuenta();
    }
    else {
        parrafo = document.getElementById("errores");
        parrafo.innerHTML = errores;
    }
}

function guardar_modificado(usuario){
    personas = JSON.parse( localStorage.getItem ( "personas" ));
    posicion_persona = ""
    for (let i = 0; i<personas.length; i++) {
        if (usuario == personas[i].nombreUsuario) {
                posicion_persona = i
            }
        }
        personas.splice(posicion_persona , (posicion_persona+1))
        var persona = {
            nombreCompleto: localStorage.getItem("nombre"),
            nombreUsuario: localStorage.getItem("usuario"),
            contrasenaUsuario: localStorage.getItem("contrasena"),
            fechaNacimiento: localStorage.getItem("nacimiento"),
            emailUsuario: localStorage.getItem("email"),
            pfpUsuario: localStorage.getItem("pfp"),
            like: localStorage.getItem("like"),
            play_list: localStorage.getItem("play_list"),
            follow: localStorage.getItem("follow")
        };
        personas.push(persona)
        localStorage.setItem ("personas", JSON.stringify ( personas ) );
}

function error_modificacion(errores){
    var parrafo = document.getElementById("errores");
    parrafo.innerHTML = errores;
}

function completar_cuenta(){
    actualizar__cabecera()
    $(".oculto").hide()
    var usuario_campo = document.getElementById("usuario_campo");
    usuario_campo.innerHTML = localStorage.getItem("usuario");

    var email_campo = document.getElementById("email_campo");
    email_campo.innerHTML = localStorage.getItem("email");

    var contrasena_campo = document.getElementById("contrasena_campo");
    contrasena_campo.innerHTML = localStorage.getItem("contrasena");

    var fecha_campo = document.getElementById("nacimiento_campo");
    fecha_campo.innerHTML = localStorage.getItem("nacimiento");

    var nombre_campo = document.getElementById("nombre_campo");
    nombre_campo.innerHTML = localStorage.getItem("nombre");

    foto = localStorage.getItem("pfp")
    if (foto != null && foto != "") {
        document.getElementById("pfp_campo").src = foto
    }


}



function boton_modificar(clase){
    var className = "." + clase
    $(className).toggle()

}

/* ----------------- Validacion de campos ----------------------------*/

function validar_correo(email){
    regex_mail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    if  ( ! regex_mail.test(email)){
        errores.push ("El correo no es válido");
    }

    personas = JSON.parse( localStorage.getItem ( "personas" ));
    for (let i = 0; i<personas.length; i++) {
        if (email == personas[i].emailUsuario) {
            errores.push( "El correo ya tiene una cuenta asignada" );
        }
        if (email == localStorage.getItem("email")) {
            errores.push ("El correo introducido es el mismo de antes");
        }
    }
}

function validar_usuario(usuario){
    if ((usuario.length < 3) || (usuario.length > 15)){
        errores.push ("El nombre no es válido");
    }
    personas = JSON.parse( localStorage.getItem ( "personas" ));
    for (let i = 0; i<personas.length; i++) {
        if (usuario == personas[i].nombreUsuario) {
            errores.push("El usuario ya tiene una cuenta asignada");
        }
        if (usuario == localStorage.getItem("usuario")) {
            errores.push("El usuario introducido es el mismo de antes");
        }
    }
}

function validar_contrasena(contrasena) {
    regex_cont = /^[a-z0-9]{2,8}$/
    if ( ! regex_cont.test(contrasena)){
        errores.push ( "La contraseña no es válida");
    }
}