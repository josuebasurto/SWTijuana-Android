/* Copyright (c) Josue Basurto | @josuebasurto | http://josuebasurto.com                   */
/*               GDG Tijuana | @GDGTijuana | http://gdg.mx                                 */
/* Aplicacion realizada para Startup Weekend Tijuana 3 | http://tijuana.startupweekend.org */

/* Configuraciones estaticas */
var msPerDay = 24 * 60 * 60 * 1000 ;
var googleApiKey = "AIzaSyDS5zTvWBetR7ngAYtdcoT02HtUwyACaC8";
var weekday = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ];
var requestcalendar = "https://www.googleapis.com/calendar/v3/calendars/0538djil1mtduscku37mvu3nos%40group.calendar.google.com/events?key=" + googleApiKey;
var salto = "\n";

/* configuraciones personalizadas */
var q = encodeURIComponent("#swtijuana OR @startuptijuana OR #SWTJ"); //Query de busqueda de Timeline de Twitter
var fechaEvento = '2013/04/05 18:00'; //Fecha del evento
var twittermobiletimeline = "https://mobile.twitter.com/search?q=" + q; //URL de busqueda en el timeline
var twitterjsontimeline = "http://search.twitter.com/search.json?&q=" + q; //URL de busqueda como API

/* funcion para obtener el calendario de Google Calendar API */
/* ver mas en: https://developers.google.com/google-apps/calendar/v3/reference/calendars/get */
function obtieneCalendario(){
    $.getJSON(requestcalendar, function(data) {
        $.each(data.items, function(key, value){
            var start = new Date( data.items[key].start.dateTime );
            var end = new Date( data.items[key].end.dateTime );
            $('#ListaCalendario').append(
                '<li class="ui-li ui-li-static ui-link-inherit" data-corners="true">' +
                    weekday[start.getDay()] + ' <br /> ' +
                    data.items[key].summary + '<br />' +
                    start.toLocaleTimeString() +' - ' + end.toLocaleTimeString() +
                    '</li>');
        });
    }).error(function() {
            alert("No se pudo sincronizar el Calendario de Actividades. " + salto + salto + requestcalendar);
            $('#Eventos').hide();
        });
}

/* funcion para obtener el timeline de la busqueda de twitter por medio del Twitter Search API que no requiere de */
/* autenticacion. ver mas en: https://dev.twitter.com/docs/using-search */
function obtieneTimeline(){
    //TODO: Obtener el Timeline de Twitter esta pendiente porque marca error al obtener, probablemente sea porque se
    //      necesite un API Key para el consumo de datos del API de busqueda.
}

function obtieneTiempoRestante(){
    //$('#TiempoRestante').text(TiempoRestante());
    $('#TiempoRestante').count
}

/* Funcion de inicio */
$(document).ready(function() {
    obtieneTiempoRestante();

    //obtieneCalendario();

    //obtieneTimeline();
});

/* Funcion que calcula el tiempo restante para el dia del evento a las 6pm */
/* ver mas en: http://stackoverflow.com/questions/11112497/javascript-countdown-with-year-month-day */
/* OK */
function TiempoRestante()
{
    var today = new Date();
    var eventdate = new Date(fechaEvento);
    var timeLeft = (eventdate.getTime() - today.getTime());
    var e_daysLeft = timeLeft / msPerDay;
    var daysLeft = Math.floor(e_daysLeft);
    var e_hrsLeft = (e_daysLeft - daysLeft)*24;
    var hrsLeft = Math.floor(e_hrsLeft);
    var minsLeft = Math.floor((e_hrsLeft - hrsLeft)*60);
    if (timeLeft >= 0)
        return "Quedan {0} dias, {1} horas, {2} minutos!".format(daysLeft, hrsLeft, minsLeft);
};

/* Implementacion de String.Format() */
/* OK */
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

/* Funcion para abrir los links en el browser nativo del movil */
/* OK */
function openLink(url)
{
    navigator.app.loadUrl(url, { openExternal:true } );
}