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


