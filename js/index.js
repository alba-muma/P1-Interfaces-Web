nombres_canciones = {
    "AlAndalus": "Al Andalus",
    "Believer" : "Believer",
    "ComeAndGetYourLove" : "Come and Get Your Love",
    "ComoCamaron" : "Como camaron",
    "ElCuartetoDeIbai" : "El cuarteto De Ibai",
    "GameOver" : "Game over",
    "HijoDeLaLuna" : "Hijo de la luna",
    "LaLaLa" : "La la la",
    "LoseYourself" : "Lose Yourself",
    "Overwhelmed" : "Overwhelmed",
    "RapContraElRacismo" : "Rap contra el racismo",
    "Rema" : "Rema",
    "SoldaditoMarinero" : "Soldadito Marinero",
    "Sugar" : "Sugar",
    "TillICollapse": "Till I Collapse"
}

lista_vacia = [];
if ( localStorage.getItem ("like") == null) {
    localStorage.setItem ("like", JSON.stringify ( lista_vacia ) );
}


function search__song() {
    let input = document.getElementById('search2').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('boton__cancion');

    if (input == "" || input==null){ 
        for (i = 0; i < x.length; i++) { 
            x[i].style.display="none";
        }
   }

    else{
        for (i = 0; i < x.length; i++) { 
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display="none";
            }
            else {
                x[i].style.display="list-item";                 
            }
        }
    }
}

$(".reproductor").hide();
function play__cancion(id){
    // Ver si el usuario ya le habia dado like
    actualizar__cabecera();
    usuario = localStorage.getItem("usuario");
    lista_likes = localStorage.getItem ( "like" );
    encontrado = 0;
    if(usuario != ""  && usuario != null){
        for (i=0; i < lista_likes.length; i++){
            if (lista_likes[i] == id)
                encontrado = 1;
        }
        if (encontrado == 1){
            $(".like_active").show();
            $(".no_like").hide();
        } else {
            $(".like_active").hide();
            $(".no_like").show();
        }
    }

    path_cancion = "audio/" + id + ".mp3";
    path_imagen = "images/" + id + ".jfif";
    document.getElementById("audio").src = path_cancion;
    document.getElementById("audio").class = id;
    document.getElementById("reproductor__imagen").src = path_imagen;
    
    $(".reproductor").show();
    audio = document.getElementsByClassName("reproductor_audio");
    audio[0].load();
    audio[0].play();
    

}


function dar_like(){
    cancion = document.getElementById("audio").class;
    lista_likes = JSON.parse(localStorage.getItem ( "like" ));
    lista_likes.push(cancion);
    localStorage.setItem ("like", JSON.stringify ( lista_likes ) );
    $(".like_active").show();
    $(".no_like").hide();

}

function quitar_like(){
    cancion = document.getElementById("audio").class;
    lista_likes = JSON.parse(localStorage.getItem ( "like" ));
    var pos = 0;
    for (i = 0; i < lista_likes.length ; i++){
        if (lista_likes[i] == cancion){
            pos = i
        }
    };
    lista_likes.splice( pos , 1 );
    localStorage.setItem ("like", JSON.stringify ( lista_likes ) );
    $(".like_active").hide();
    $(".no_like").show();

}

$(".ventana_playlist").hide();
function cancelar_playlist(){
    $(".ventana_playlist").hide();
}

function nombre_play_list(){
    $(".ventana_playlist").show();
}


function nombre_introducido_correcto () {
    nombre_introducido = document.getElementById("nombre_introducido").value;
    if (nombre_introducido != null && nombre_introducido != ""){
        nueva_playlist(nombre_introducido);
    }
}

function nueva_playlist(nombre){
    $(".ventana_playlist").hide();
    /* Se añade el html correcpondiente */
    const play_list = document.createElement("div");
    play_list.className = "play_list";
    play_list.id = nombre;

    const nombre_pl = document.createElement("h3");
    nombre_pl.innerHTML = nombre;

    const imagen_pl = document.createElement("img");
    imagen_pl.src = "images/play.png";
    imagen_pl.onclick = crear_redirigir(nombre);

    const imagen_pl2 = document.createElement("img");
    imagen_pl2.src = "images/basura.png";
    imagen_pl2.id = "bin";
    imagen_pl2.onclick = borrador(nombre);

    play_list.appendChild(imagen_pl);
    play_list.appendChild(imagen_pl2);
    play_list.appendChild(nombre_pl);

    const play_lists = document.getElementById("play_lists");
    play_lists.appendChild(play_list);

    /* Se añade la playlist al usuario */
    play_list_usuario = JSON.parse( localStorage.getItem ( "play_list" ));
    play_list_usuario.push([nombre , []]);
    localStorage.setItem ("play_list", JSON.stringify ( play_list_usuario ) );
    
}

$(".ventana_eliminar").hide();
function cancelar_eliminado(){
    $(".ventana_eliminar").hide();
}

function borrar_playlist(id){
    localStorage.setItem("borrar_pl", id);
    $(".ventana_eliminar").show();
}

function borrador(id){
    return function(){borrar_playlist(id)}
}

function eliminar_pl(){
    const pl = localStorage.getItem("borrar_pl");
    const list = JSON.parse( localStorage.getItem ( "play_list" ));
    const pos = 0;
    for (i = 0; i < list.length; i++){
        if (list[i]== pl){
            pos = i;
        }
    }
    list.splice(pos, pos+1);
    localStorage.setItem ("play_list", JSON.stringify ( list ) );
    window.location.href = "perfil.html";
}


function completar_playlist() {
    play_list_usuario = JSON.parse( localStorage.getItem ( "play_list" ));
    for ( i = 0 ; i < play_list_usuario.length ; i++ ){
        const play_list = document.createElement("div");
        play_list.className = "play_list";
        play_list.id = play_list_usuario[i][0];
                
        const nombre_pl = document.createElement("h3");
        nombre_pl.innerHTML = play_list_usuario[i][0];
    
        const imagen_pl = document.createElement("img");
        imagen_pl.src = "images/play.png";
        imagen_pl.onclick = crear_redirigir(play_list_usuario[i][0]);

        const imagen_pl2 = document.createElement("img");
        imagen_pl2.src = "images/basura.png";
        imagen_pl2.id = "bin";
        imagen_pl2.onclick = borrador(nombre);
    
        play_list.appendChild(imagen_pl);
        play_list.appendChild(imagen_pl2);
        play_list.appendChild(nombre_pl);
    
        const play_lists = document.getElementById("play_lists");
        play_lists.appendChild(play_list);
    }
}

function redirigir_playlist(id){
    localStorage.setItem("lista_actual" , id)
    window.location.href = "playlist.html";
    crear_playlist();
}

function crear_playlist(){
    // Ocultar el buscador para añadir canciones
    let input = document.getElementById('search_cancion').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('buscador_cancion');

    if (input == "" || input==null){ 
        for (i = 0; i < x.length; i++) { 
            x[i].style.display="none";
        }
   }

    id = localStorage.getItem("lista_actual");
    canciones = "";
    if (id == "like"){ //Obtencion de la playlist de likes
        canciones = JSON.parse(localStorage.getItem ( "like" ));
    } else {  // Obtencion de cualquier playlist
        playlist = JSON.parse( localStorage.getItem ( "play_list" ));
        for (i = 0; i < playlist.length; i++){
            if (playlist[i][0] == id) {
                canciones = playlist[i][1];
            }
        }
    }
    boton = document.getElementsByClassName("eliminar_playlist");
    boton.id = id; 
    for ( i = 0; i < canciones.length ; i++ ) {
        crear_cancion(canciones[i]);
    }
}

function crear_cancion(nombre){
    // Creacion del div cancion
    const cancion = document.createElement("div");
    cancion.className = "cancion";
    cancion.onclick = crear_play_cancion(nombre);
    // Creacion de la imagen
    const imagen_cancion = document.createElement("img");
    imagen_cancion.src = "/images/" + nombre + ".jfif";
    imagen_cancion.className = "imagen_cancion";
    // Creacion del h3
    const h3_cancion = document.createElement("h3");
    h3_cancion.id = "nombre_cancion";
    h3_cancion.textContent = nombres_canciones[nombre];
    // Creacion de play
    const play = document.createElement("img");
    play.src = "/images/play.png";
    play.className = "play";
    play.id = nombre;

    const imagen_pl2 = document.createElement("img");
    imagen_pl2.src = "images/basura.png";
    imagen_pl2.id = "bin2";
    imagen_pl2.onclick = borrador2(nombre);

    //Añado todo a el html
    cancion.appendChild(imagen_cancion);
    cancion.appendChild(play);
    cancion.appendChild(h3_cancion);
    cancion.appendChild(imagen_pl2)
    const canciones_div = document.getElementById("canciones");
    canciones_div.appendChild(cancion);
}

$(".ventana_eliminar2").hide();
function cancelar_eliminado2(){
    $(".ventana_eliminar2").hide();
}

function borrar_cancion(id){
    localStorage.setItem("borrar_cancion", id);
    $(".ventana_eliminar2").show();
}

function borrador2(id){
    return function(){borrar_cancion(id)}
}

function eliminar_cancion(){
    const song = localStorage.getItem("borrar_cancion");
    var play_list = JSON.parse( localStorage.getItem ( "play_list" ));
    const play_list2 = localStorage.getItem("lista_actual");
    var play_list3 = 0;
    var pos = 0;
    var pos_list = 0;
    console.log(song);
    if (play_list2 != "like"){
    for (i= 0; i<play_list.length; i++){
        if (play_list[i][0] == play_list2){
            play_list3 = play_list[i];
            pos_list = i;
        }
    }
    for (i=0; i<play_list3[1].length; i++){
        if (play_list3[1][i]==song){
            pos = i;
        }
    }
    play_list3[1].splice(pos, 1);
    play_list[pos_list] = play_list3;
    localStorage.setItem ("play_list", JSON.stringify ( play_list ) );}

    else {
        var play_like = JSON.parse( localStorage.getItem ("like"));
        var pos_like = 0;

        for (i = 0; i < play_like.length ; i++){
            if (play_like[i] == song){
                pos_like = i;
            }
        }
        play_like.splice(pos_like, 1);
        localStorage.setItem ("like", JSON.stringify ( play_like ) );
    }
    window.location.href = "playlist.html";
}

function crear_play_cancion(id){
    return function(){play__cancion(id)}
}

function crear_redirigir(id){
    return function(){redirigir_playlist(id)}
}

function buscador_playlist() {
    let input = document.getElementById('search_cancion').value;
    input=input.toLowerCase();
    let x = document.getElementsByClassName('buscador_cancion');

    if (input == "" || input==null){ 
        for (i = 0; i < x.length; i++) { 
            x[i].style.display="none";
        }
   }

    else{
        for (i = 0; i < x.length; i++) { 
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display="none";
            }
            else {
                x[i].style.display="list-item";                 
            }
        }
    }
}

function añadir_cancion_playlist (id){
    lista_ahora = localStorage.getItem("lista_actual");
    var lista = [];
    if (lista_ahora != "like"){
        listas = JSON.parse( localStorage.getItem ( "play_list" ));
        for (i = 0; i < listas.length; i++){
            if (listas[i][0] == lista_ahora){
                lista_completa = listas[i];
                lista = listas[i][1];
                pos = i;
            }
        }
        listas.splice(pos , pos+1);
    }else {
        lista = JSON.parse( localStorage.getItem ( "like" ));
    }
    lista.push(id);
    if (lista_ahora == "like"){
        localStorage.setItem ("like", JSON.stringify ( lista ) );
    }else{
        console.log(lista_completa);
        lista_completa[1] = lista;
        listas.push (lista_completa)
        localStorage.setItem ("play_list", JSON.stringify ( listas ) );
    }
    crear_cancion(id);
    hay_canciones();
    /*setTimeout(function(){ alert("Hello"); }, 3000);*/
}

function redirigir_seguidos(){
    window.location.href = "seguidos.html";
}

function redirigir_artistas(){
    window.location.href = "artista.html";
}

function redirigir_index(){
    window.location.href = "index.html";
}


$(".no_canciones").hide();
function hay_canciones(){
    play_list =  localStorage.getItem("lista_actual");
    var lista = [];
    if(play_list == "like"){
        lista = JSON.parse(localStorage.getItem("like"));
    }
    else {
        listas = JSON.parse( localStorage.getItem("play_list"));
        for (i = 0 ; i < listas.length ; i++){
            if (listas[i][0] == play_list){
                lista = listas[i][1];
            }
        }
    }
    if (lista.length == 0){
        $(".no_canciones").show();
    }
    else{
        $(".no_canciones").hide();
    }
}

$(".ventana_eliminar").hide();
function cancelar_eliminado(){
    $(".ventana_eliminar").hide();
}

var fin = new Date('12/10/2022 10:20 PM');
var _segundos = 1000;
var _minutos = _segundos * 60;
var _horas = _minutos * 60;
var _dias = _horas * 24;
var temporizador;

function showRemaining() {
    var hoy = new Date();
    var tiempo = fin - hoy;
    if (tiempo < 0) {

        clearInterval(temporizador);
        document.getElementById('countdown').innerHTML = 'EXPIRED!';

        return;
    }
    var dias = Math.floor(tiempo / _dias);
    var horas = Math.floor((tiempo % _dias) / _horas);
    var minutos = Math.floor((tiempo % _horas) / _minutos);
    var segundos = Math.floor((tiempo % _minutos) / _segundos);

    document.getElementById('countdown').innerHTML = dias + ':';
    if (horas < 10){
        document.getElementById('countdown').innerHTML += '0' + horas + ':';
    }

    else{
        document.getElementById('countdown').innerHTML += horas + ':';
    }
    if (minutos < 10){
        document.getElementById('countdown').innerHTML += '0' + minutos + ':';
    }

    else{
        document.getElementById('countdown').innerHTML += minutos + ':';
    }
    if (segundos < 10){
        document.getElementById('countdown').innerHTML += '0' + segundos;
    }

    else{
        document.getElementById('countdown').innerHTML += segundos;
    }
}

var fin2 = new Date('12/25/2022 7:20 PM');
var temporizador2;
function showRemaining2() {
    var hoy = new Date();
    var tiempo = fin2 - hoy;
    if (tiempo < 0) {

        clearInterval(temporizador2);
        document.getElementById('countdown2').innerHTML = 'EXPIRED!';

        return;
    }
    var dias = Math.floor(tiempo / _dias);
    var horas = Math.floor((tiempo % _dias) / _horas);
    var minutos = Math.floor((tiempo % _horas) / _minutos);
    var segundos = Math.floor((tiempo % _minutos) / _segundos);

    document.getElementById('countdown2').innerHTML = dias + ':';
    if (horas < 10){
        document.getElementById('countdown2').innerHTML += '0' + horas + ':';
    }

    else{
        document.getElementById('countdown2').innerHTML += horas + ':';
    }
    if (minutos < 10){
        document.getElementById('countdown2').innerHTML += '0' + minutos + ':';
    }

    else{
        document.getElementById('countdown2').innerHTML += minutos + ':';
    }
    if (segundos < 10){
        document.getElementById('countdown2').innerHTML += '0' + segundos;
    }

    else{
        document.getElementById('countdown2').innerHTML += segundos;
    }
}

var fin3 = new Date('1/12/2023 5:34 AM');
var temporizador3;
function showRemaining3() {
    var hoy = new Date();
    var tiempo = fin3 - hoy;
    if (tiempo < 0) {

        clearInterval(temporizador3);
        document.getElementById('countdown3').innerHTML = 'EXPIRED!';

        return;
    }
    var dias = Math.floor(tiempo / _dias);
    var horas = Math.floor((tiempo % _dias) / _horas);
    var minutos = Math.floor((tiempo % _horas) / _minutos);
    var segundos = Math.floor((tiempo % _minutos) / _segundos);

    document.getElementById('countdown3').innerHTML = dias + ':';
    if (horas < 10){
        document.getElementById('countdown3').innerHTML += '0' + horas + ':';
    }

    else{
        document.getElementById('countdown3').innerHTML += horas + ':';
    }
    if (minutos < 10){
        document.getElementById('countdown3').innerHTML += '0' + minutos + ':';
    }

    else{
        document.getElementById('countdown3').innerHTML += minutos + ':';
    }
    if (segundos < 10){
        document.getElementById('countdown3').innerHTML += '0' + segundos;
    }

    else{
        document.getElementById('countdown3').innerHTML += segundos;
    }
}

var fin4 = new Date('12/10/2022 10:20 PM');
var temporizador4;
function showRemaining4() {
    var hoy = new Date();
    var tiempo = fin4 - hoy;
    if (tiempo < 0) {

        clearInterval(temporizador4);
        document.getElementById('countdown4').innerHTML = 'EXPIRED!';

        return;
    }
    var dias = Math.floor(tiempo / _dias);
    var horas = Math.floor((tiempo % _dias) / _horas);
    var minutos = Math.floor((tiempo % _horas) / _minutos);
    var segundos = Math.floor((tiempo % _minutos) / _segundos);

    document.getElementById('countdown4').innerHTML = dias + ':';
    if (horas < 10){
        document.getElementById('countdown4').innerHTML += '0' + horas + ':';
    }

    else{
        document.getElementById('countdown4').innerHTML += horas + ':';
    }
    if (minutos < 10){
        document.getElementById('countdown4').innerHTML += '0' + minutos + ':';
    }

    else{
        document.getElementById('countdown4').innerHTML += minutos + ':';
    }
    if (segundos < 10){
        document.getElementById('countdown4').innerHTML += '0' + segundos;
    }

    else{
        document.getElementById('countdown4').innerHTML += segundos;
    }
}

function indexa(){
    temporizador = setInterval(showRemaining, 1000);
    temporizador2 = setInterval(showRemaining2, 1000);
    temporizador3= setInterval(showRemaining3, 1000);
    temporizador4 = setInterval(showRemaining4, 1000);
}
