import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "../components";

export default function MainPage() {
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!mapsApiKey) {
    console.error("Google Maps API key is not defined in environment variables.");
  }

  useEffect(() => {
    (g => {
      var h, a, k,
        p = "The Google Maps JavaScript API",
        c = "google",
        l = "importLibrary",
        q = "__ib__",
        m = document,
        b = window;

      b = b[c] || (b[c] = {});
      var d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams();

      const u = () =>
        h ||
        (h = new Promise(async (f, n) => {
          a = m.createElement("script");
          e.set("libraries", [...r] + "");
          for (k in g)
            e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
          e.set("callback", c + ".maps." + q);
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
          d[q] = f;
          a.onerror = () => (h = n(Error(p + " could not load.")));
          a.nonce = m.querySelector("script[nonce]")?.nonce || "";
          m.head.append(a);
        }));

      d[l]
        ? console.warn(p + " only loads once. Ignoring:", g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
    })({
      key: mapsApiKey,
      v: "weekly",
    });

    let map;
    
    async function initMap() {
      const { Map } = await google.maps.importLibrary("maps");
      await google.maps.importLibrary("marker");

      map = new Map(document.getElementById("map"), {
        center: { lat: 40.768738, lng: -73.965179 },
        zoom: 18,
        mapId: "DEMO_MAP_ID",

        // TODO: Configure Cloud styling  

        // disableDefaultUI: true, // removes default buttons (zoom, street view, etc.)
        // styles: [
        //   {
        //     elementType: "geometry",
        //     stylers: [{ color: "#e0e0e0" }], // neutral gray background
        //   },
        //   {
        //     elementType: "labels",
        //     stylers: [{ visibility: "off" }], // hide all labels
        //   },
        //   {
        //     featureType: "poi",
        //     stylers: [{ visibility: "off" }], // hide POIs
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry",
        //     stylers: [{ color: "#c8c8c8" }], // subtle roads
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "labels.icon",
        //     stylers: [{ visibility: "off" }], // hide road icons
        //   },
        //   {
        //     featureType: "transit",
        //     stylers: [{ visibility: "off" }], // hide bus/train lines
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "geometry",
        //     stylers: [{ color: "#d6d6d6" }], // slightly darker gray for contrast
        //   },
        // ],
        
      });

      currentLocationMarker();
      addMarkers();
    }

    async function currentLocationMarker() {
      let userMarker;
      const { Marker } = await google.maps.importLibrary("marker");
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log("User's current position:", pos);

            // Add a marker for user's current location
            if (!userMarker) {
              userMarker = new Marker({
                map,
                position: pos,
                title: "You are here",
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#007BFF",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "#FFFFFF"
                }
              });
            } else {
              userMarker.position = pos;
            }
            map.setCenter(pos);
          },
          () => {
            console.error("Geolocation permission denied or unavailable");
          }
        );
      } else {
        console.error("Geolocation not supported by this browser.");
      }
    }

    // Sample coordinates for demo
    const coords = [
      { lat: 40.768890, lng: -73.965050 },
      { lat: 40.768530, lng: -73.964950 },
      { lat: 40.769100, lng: -73.966000 },
      { lat: 40.767980, lng: -73.964200 },
      { lat: 40.771000, lng: -73.967000 },
      { lat: 40.766700, lng: -73.962500 },
      { lat: 40.764000, lng: -73.968000 },
      { lat: 40.772500, lng: -73.959500 },
      { lat: 40.761500, lng: -73.970500 },
      { lat: 40.757800, lng: -73.971800 },
    ];
    
    async function addMarkers() {
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      for (let i = 0; i < coords.length; i++) {
        const marker = new AdvancedMarkerElement({
          map: map,
          position: coords[i],
          title: `Post ${i + 1}`,
        });
      }
    }

    initMap();
  }, []);
  
  return (
    <div>
      <Navbar/>
      <div 
        id="map" 
        className="w-full h-[800px]"
        region="us"
      ></div>
    </div>
  )
}