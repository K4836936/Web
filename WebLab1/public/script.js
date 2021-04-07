const url = 'http://autocomplete.travelpayouts.com/places2?';

$('button#Search').on('click', function (e) {
	Delete();
	
    var Search = $('input#Search').val();
    var TypeSearch = $('select#TypeSearch option:selected').val();
    var TypeLanguage = $('select#TypeLanguage option:selected').val();

    if(Search == ""){
        alert("Строка поиска пуста!");
        return;
    }

    var newUrl = url +
        'term=' + Search +
        '&local=' + TypeLanguage +
        '&types[]=' + TypeSearch;

    var request = new XMLHttpRequest();
    console.log(newUrl);

    request.open('GET', newUrl);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var result = request.response;
        console.log(result);
        
        if(result.length != 0){
            for(var i = 0; i < result.length; i++){
                if(result[i].type == "country"){
                    var otvet = $(
                        '<div class="blog-post  wow fadeInUp">' + 
                        '<h1>' + result[i]['name'] + '</h1>' +
                        '<p>Тип объекта (город/аэропорт/страна): ' + result[i]['type'] + '</p>' +
                        '<p>Код: ' + result[i]['code'] + '</p>' +
                        '</div>'
                    );
                    $('div.Result').append(otvet);
                }
                if(result[i].type == "city"){
                    Add(
                        //название страны
                        result[i]['country_name'],
                        //название города/аэропорта
                        result[i]['name'],
                        //название аэропорта, если есть (null)
                        result[i]['main_airport_name'],
                        //тип объекта
                        result[i]['type'],
                        //координаты
                        result[i]['coordinates']['lon'],
                        result[i]['coordinates']['lat']
                    );
                }
                if(result[i].type == "airport"){
                    Add(
                        //название страны
                        result[i]['country_name'],
                        //название города/аэропорта
                        result[i]['name'],
                        //название аэропорта, если есть (null)
                        result[i]['main_airport_name'],
                        //тип объекта
                        result[i]['type'],
                        //координаты
                        result[i]['coordinates']['lon'],
                        result[i]['coordinates']['lat']
                    );
                }
                
            }
        }
        else{
            alert("В результате обработки запроса произошла ошибка");
        }
    }

    e.stopPropagation();
});

function Add(CountryName, Name, AirportName, type, lon, lat) {
    if(AirportName == null){
        AirportName = "нет";
        if(type == "airport"){
            AirportName = Name;
        }
    }
    var otvet = $(
        '<div class="blog-post  wow fadeInUp">' + 
        '<h1>' + CountryName + '</h1>' +
        '<p>Тип объекта (город/аэропорт/страна): ' + type + '</p>' +
        '<p>Название города/аэропорта: ' + Name + '</p>' +
        '<p>Название аэропорта: ' + AirportName + '</p>' +
        '<p>Координаты объекта: широта - ' + lon + ' долгота - ' + lat + '</p>' +
        '</div>'
    );
    $('div.Result').append(otvet);
}

function Delete(){
    $('div.blog-post').remove();
}

window.onload = function(){
    let url = 'http://api-gateway.travelata.ru/directory/countries';

    var request = new XMLHttpRequest();
    console.log(url);

    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var result = request.response;
        console.log(result);
    }
};
