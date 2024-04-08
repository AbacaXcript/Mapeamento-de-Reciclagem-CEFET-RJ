import key from './key';

var apiKey = key.mapsApiKey;

// escondi a chave api num arquivo pra nao vazar.

function initMap() {
    // Coordenadas iniciais (centro do mapa)
    var initialCoords = {lat: -23.5505, lng: -46.6333};
  
    // Criar o mapa
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: initialCoords
    });
  
    // Array com locais de reciclagem (exemplo)
    var recyclingLocations = [
      {position: {lat: -23.559, lng: -46.705}},
      {position: {lat: -23.570, lng: -46.650}},
      {position: {lat: -23.590, lng: -46.620}}
    ];
  
    // Adicionar marcadores para cada local de reciclagem
    recyclingLocations.forEach(function(location) {
      var marker = new google.maps.Marker({
        position: location.position,
        map: map
      });
    });
  }
  
// Função para buscar a localização
function searchLocation() {
  // Obter o valor digitado pelo usuário
  var location = document.getElementById('location-input').value;

  // Criar um objeto de geocodificação
  var geocoder = new google.maps.Geocoder();

  // Realizar a geocodificação
  geocoder.geocode({'address': location}, function(results, status) {
      if (status === 'OK') {
          // Obter as coordenadas da localização
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          // Atualizar o mapa para centralizar na localização encontrada
          map.setCenter({lat: latitude, lng: longitude});

          // Adicionar marcador na localização encontrada
          var marker = new google.maps.Marker({
              map: map,
              position: {lat: latitude, lng: longitude}
          });
      } else {
          // Se a geocodificação falhar, exibir uma mensagem de erro
          alert('Erro ao encontrar a localização: ' + status);
      }
  });
}