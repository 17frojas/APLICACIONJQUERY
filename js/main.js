b = 0; // cantidad de bombas
e = 0; // cantidad de enemigos
vivo = true; // sigue vivo
puntaje = 0;
 

$(function(){
   
   w = $("body").width(); // obtiene el ancho de la pantallla
   h = $("body").height();     // obtiene el alto de pantalla
   
   player_pos_x = (w - 60) / 2; // le da laposicion 
   player_pos_y = h - 40;
   $("#player").css({"top": player_pos_y, "left": player_pos_x}); 
   // obtener las techas precionadas
   $("body").keydown(function(e){
        t = e.which;
        
        player_pos = $("#player").position();
        switch(t){
            case 37:
                /** Izquierda **/
                if (vivo){
                    new_x = player_pos.left - 20
                    if ( player_pos.left > 10 ){
                        $("#player").css({"left": new_x});    
                    }
                } 
                break;
            case 39:
                /** Derecha **/
                if (vivo){
                    new_x = player_pos.left + 20
                    if (player_pos.left < w - 60){
                        $("#player").css({"left": new_x});    
                    }
                }
                break;
            case 32:
                /** Bomba **/
                if (vivo){
                    b++;
                
                    bomb_pos_x = player_pos.left + 22;
                    bomb_pos_y = player_pos.top - 15;
                    
                    $("#ctn-main").append("<div id='b-"+ b +"' class='bomb' style='top: "+ bomb_pos_y +"; left: "+ bomb_pos_x +"'></div>");
                    disparo= document.getElementById("disparo");
                    disparo.play();
                    MoveBomb(b); 
                }
                
                break;
        }
   });
   
   GenerateEnemy();
   
});


function MoveBomb(nro){
    bomb_pos = $("#b-" + nro).position();
    
    if (bomb_pos.top > -10){
             
        $(".enemy").each(function(){
            data = $(this).attr("data-uid");
            
            enemy_pos = $(this).position();
            if ( (enemy_pos.top + 100 >= bomb_pos.top) && ( enemy_pos.left <= bomb_pos.left && enemy_pos.left + 100 >= bomb_pos.left) ){
                //alert("colision"); 
                    
                $("#b-" + nro).hide();
                $(this).fadeOut(1000);
                
                if ( $(this).attr("data-colision") == 0 ){
                    cuac= document.getElementById("cuac");
                    cuac.currentTime = 0;
                    cuac.play();
                    puntaje += 10;
                    $("#visor").html(puntaje);
                    $(this).attr("data-colision", 1);
                }

                  
            }
            
        })
        
        $("#b-" + nro).css({"top": bomb_pos.top - 10});
        setTimeout("MoveBomb(" + nro + ")", 50); //velocidad de la bomba
    }
    
}

function GenerateEnemy(){
    if (vivo){
        w = $("body").width();
        r = aleatorio(10, w - 110);
        enemy_pos_x = r;
        enemy_pos_y = 15;
        
        e++;
        $("#ctn-main").append("<div id='e-"+ e +"' data-uid='"+ e + "' data-colision='0' class='enemy' style='top: "+ enemy_pos_y +"; left: "+ enemy_pos_x +"'></div>");
        MoveEnemy(e);
    }
    
    
    setTimeout("GenerateEnemy()", 3000);
}

function MoveEnemy(nro){ //analizar la funcion para congelar enemigos por 3 seg.
    if (vivo){
        h = $("body").height();
        enemy_pos = $("#e-" + nro).position();
        
        if (enemy_pos.top < h){
            $("#e-" + nro).css({"top": enemy_pos.top + 5});
            setTimeout("MoveEnemy(" + nro + ")", 60);//velocidad del enemigo
        }else{
            vivo = false;
            gameover= document.getElementById("gameover");
            gameover.currentTime = 0;
            gameover.play();
            alert('Fin del Juego ');
            location.reload();

        }
    }
    
}

function aleatorio(a,b) {
    nro = Math.round(Math.random()*(b-a)+parseInt(a));
    return nro;
}