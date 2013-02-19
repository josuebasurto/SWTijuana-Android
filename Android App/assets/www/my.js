$(document).ready(function() {
    var requestcalendar = "https://www.googleapis.com/calendar/v3/calendars/0538djil1mtduscku37mvu3nos%40group.calendar.google.com/events?key=AIzaSyDS5zTvWBetR7ngAYtdcoT02HtUwyACaC8";
    
    var weekday=new Array(7);
    weekday[0]="Domingo";
    weekday[1]="Lunes";
    weekday[2]="Martes";
    weekday[3]="Miercoles";
    weekday[4]="Jueves";
    weekday[5]="Viernes";
    weekday[6]="Sabado";

    
    var tiemporestante = TiempoRestante();
    $('#TiempoRestante').text(tiemporestante);
   
    //Getting calendar
    //$('#ListaCalendario').text('Cargando...');
    
    var jqxhr = $.getJSON(requestcalendar, 
    			 function(data) {
    				$.each(data.items, function(key, value){
    					var start = new Date( data.items[key].start.dateTime ); 
    					var end = new Date( data.items[key].end.dateTime );
    					$('#ListaCalendario').append('<li class="ui-li ui-li-static ui-link-inherit" data-corners="true">' + weekday[start.getDay()] + ' <br /> ' + data.items[key].summary + '<br />' + start.toLocaleTimeString() +' - ' + end.toLocaleTimeString() + '</li>');
    				});
    			 })
                 .error(function() { 
                	 alert("No se pudo sincronizar el Calendario de Actividades. "  + requestcalendar);
                 });
});

function TiempoRestante()
{
    var today = new Date();
    var eventdate = new Date('2013/04/05');
    var msPerDay = 24 * 60 * 60 * 1000 ;
    var timeLeft = (eventdate.getTime() - today.getTime());
    var e_daysLeft = timeLeft / msPerDay;
    var daysLeft = Math.floor(e_daysLeft);
    var e_hrsLeft = (e_daysLeft - daysLeft)*24;
    var hrsLeft = Math.floor(e_hrsLeft);
    var minsLeft = Math.floor((e_hrsLeft - hrsLeft)*60);
    if (timeLeft >= 0)
    	return "Quedan " + daysLeft + " dias, " + hrsLeft +" horas y " + minsLeft + " minutos para el Evento!";
    else
    	return 'Ha iniciado ya el evento, estas al pendiente de las actividades?';
};