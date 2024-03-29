mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "show-map",
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: campgroundMap.geometry.coordinates, // starting position [lng, lat]
  zoom: 8, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(campgroundMap.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h6>${campgroundMap.title}</h6>`
    )
  )
  .addTo(map);
