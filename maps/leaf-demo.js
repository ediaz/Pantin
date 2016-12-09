// See post: http://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/
var places = {
  "Rouen1":[49.4432, 1.1000],
  "Rouen2":[49.443, 1.1000],
  "London1":[51.504, -0.1278],
  "London2":[51.501, -0.1274],
  "London3":[51.504, -0.1273],
  "London4":[51.5074, -0.1272],
  "Knaresborough":[54.0110, -1.4710],
  "Pointe a Pierre":[10.3155, -61.4596],
  "Port of Spain":[10.6617, -61.5194],
  "Caracas":[10.4806, -66.9036],
  "Chacao":[10.4979,-66.8499]
};

var names = [
  {
    "name": "Julio Pantin Alfonso",
    "place": "Chacao",
    "from": "Caracas",
    "father":"Federico Lewis Pantin"
  },
  {
    "name": "Federico Lewis Pantin",
    "place": "Caracas",
    "from":"Port of Spain",
    "father":"Frederick Lewis Pantin Ganteaume"
  },
  {
    "name": "Frederick Lewis Pantin Ganteaume",
    "place": "Port of Spain",
    "from": "Pointe a Pierre",
    "father":"Charle Georges John Pantin de Mouillebert"
  },
  {
     "name":"Charles Georges John Pantin de Mouillebert",
     "place": "Pointe a Pierre",
     "from": "Knaresborough",
     "father":"Lewis (IV) Pantin"
  },
  {
    "name":"Lewis (IV) Pantin",
    "place":"Knaresborough",
    "from":"London1",
    "father":"Lewis (III) Pantin"
  },
  {
    "name":"Lewis (III) Pantin",
    "place":"London1",
    "from":"London2",
    "father":"Lewis (II) Pantin"
  },
  {
    "name":"Lewis (II) Pantin",
    "place":"London2",
    "from":"London3",
    "father":"Lewis Pantin"
  },
  {
    "name":"Lewis Pantin",
    "place":"London3",
    "from":"Rouen1",
    "father": "Simón Pantin"
  },
  {
    "name":"Simón Pantin",
    "place":"Rouen1",
    "from":"London4",
    "father":"Isaïe Pantin II"
  },
  {
    "name":"Isaïe Pantin II",
    "place":"London4",
    "from":"Rouen2",
    "father":"Isaïe Pantin"
  },
  {
    "name":"Isaïe Pantin",
    "place":"Rouen2",
    "from":"Rouen2",
    "father":"primero en la línea"
  }
];


var map = L.map( 'map', {
  center: [30.0, 33.0],
  minZoom: 2,
  zoom: 2
})

L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map )

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' )

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin24.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
})

for ( var i=0; i < names.length; ++i )
{
  var place = names[i].place;

  L.marker( places[place], {icon: myIcon} )
    .bindPopup( names[i].name +" hijo de "+names[i].father)
    .addTo( map );
  
  var from = places[names[i].from];
  var place = places[names[i].place];

  var pointA = new L.LatLng(from[0],from[1]);
  var pointB = new L.LatLng(place[0],place[1]);
  var pointList = [pointA, pointB];

  var firstpolyline = new L.Polyline(pointList, {
      color: 'black',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 0
  });
  firstpolyline.addTo(map);
}
