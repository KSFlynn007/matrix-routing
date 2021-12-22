import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import './App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [search, setSearch] = useState({
    latitude : 51.038266,
    longitude : -114.073067
  })

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng
      }
    }
  }

  const drawRoute = (geoJson, map) => {
    if (map.getLayer('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    }
    map.addLayer({
      id: 'route',
      type: 'line', 
      source: {
        type: 'geojson',
        data: geoJson
      },
      paint: {
        'line-color': '#4a90e2',
        'line-width': 6
      }
    })
  }

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement('div')
    element.className = 'marker-delivery'
    new tt.Marker({
      element: element
    })
    .setLngLat(lngLat)
    .addTo(map)
  }

  useEffect(() => {
    const origin = {
      lng: search.longitude,
      lat: search.latitude,
    }
    const destinations = []

    let map = tt.map({
      key: process.env.REACT_APP_TOMTOM_KEY,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [search.longitude, search.latitude],
      zoom: 13
    })
    
    setMap(map)

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -35]
      }
      const popup = new tt.Popup({
        offset: popupOffset
      }).setHTML('This is you!')

      const element = document.createElement('div')
      element.className = 'marker'

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
      .setLngLat([search.longitude, search.latitude])
      .addTo(map)

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()

        setSearch({
          longitude: lngLat.lng,
          latitude : lngLat.lat
        })
      })

      marker.setPopup(popup).togglePopup()
    }
    addMarker()

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination)
      })
      const callParameters = {
        key: process.env.REACT_APP_TOMTOM_KEY,
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      }
      return new Promise((resolve, reject) => {
        ttapi.services
          .matrixRouting(callParameters)
          .then((matrixAPIResults) => {
            const results = matrixAPIResults.matrix[0]
            const resultsArray = results.map((result, index) => {
              return {
                location: locations[index],
                drivingtime: result.response.routeSummary.travelTimeInSeconds,
              }
            })
            resultsArray.sort((a, b) => {
              return a.drivingtime - b.drivingtime
            })
            const sortedLocations = resultsArray.map((result) => {
              return result.location
            })
            resolve(sortedLocations)
          })
      })
    }

    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin)

        ttapi.services.calculateRoute({
          key: process.env.REACT_APP_TOMTOM_KEY,
          locations: sorted
        })
        .then((routeData) => {
          const geoJson = routeData.toGeoJson()
          drawRoute(geoJson, map)
        })
      })
    }

    map.on('click', (e) => {
      destinations.push(e.lngLat);
      addDeliveryMarker(e.lngLat, map)
      recalculateRoutes()
    })

    return () => map.remove();

  }, [search.latitude, search.longitude])

  // console.log(search.latitude)
  // console.log(search.longitude)

  return (
    <div>
      {/* only load if map is going to render */}
      {map && 
        <div className="app">
          <h1>Where to?</h1>
          <div className="search-bar">
            <p>Latitude:</p>
            <input 
              type="number"
              id="latitude"
              className="latitude"
              placeholder={search.latitude}
              />
            <p>Longitude:</p>
            <input 
              type="number"
              id="longitude"
              className="longitude"
              name='longitude'
              placeholder={search.longitude}
              />
              <button
                className='search-btn'
                onClick={(e) => {setSearch({
                  latitude: document.getElementById('latitude').value,
                  longitude: document.getElementById('longitude').value
                })}}
              >
                Search
              </button>

          </div>
          <div ref={mapElement} className="map"></div>
          <p>You can hold down "Ctrl" when clicking to tilt map!</p>
        </div>
      }
    </div>
  );
}

export default App;
