function search_user() {
    let input = document.getElementById('search_users').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('buscador_usuario');

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


function añadir_follow (id){
    lista_ahora = localStorage.getItem("lista_actual");
    if (lista_ahora != "like"){
        listas = JSON.parse( localStorage.getItem ( "play_list" ));
        for (i = 0; i < listas.length; i++){
            if (listas[i][0] == lista_ahora){
                lista_completa = listas[i];
                lista = listas[i][1];
                pos = i;
            }
        }
        listas.slice(pos , pos+1);
    }else {
        lista = JSON.parse( localStorage.getItem (  ));
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
}

function añadir_follow (id){
    follow = JSON.parse( localStorage.getItem ( "follow" ));
    encontrado = 0;
    for (i = 0; i< follow.length; i++){
        if (follow[i] == id){
            encontrado = 1;
        }
    }
    if (encontrado == 0){
        follow.push(id);
        localStorage.setItem ("follow", JSON.stringify ( follow ) );
        añadir_follow_html(id);
    }
}

function añadir_follow_html (id){
    const usuario = document.createElement("div");
    usuario.className = "usuario";
    /*cancion.onclick = crear_play_cancion(nombre);*/
    // Creacion de la imagen
    const imagen_usuario = document.createElement("img");
    imagen_usuario.src = "/images/Personas/" + id + ".jpeg";
    imagen_usuario.className = "imagen_usuario";
    // Creacion del h3
    const h3_usuario = document.createElement("h3");
    h3_usuario.textContent = id;

    const usuarios = document.getElementById("usuarios");
    usuario.appendChild(imagen_usuario);
    usuario.appendChild(h3_usuario);
    usuarios.appendChild(usuario);
    hay_follow();
}

function crear_lista_follow (){
    follow = JSON.parse( localStorage.getItem ( "follow" ));
    for (i = 0; i < follow.length ; i++){
        añadir_follow_html(follow[i]);
    }
}

$(".no_follow").hide();
function hay_follow(){
    lista = JSON.parse(localStorage.getItem("follow"));
    console.log(lista == []);
    console.log(lista);
    if (lista.length == 0){
        $(".no_follow").show();
    }
    else{
        $(".no_follow").hide(); 
    }
}