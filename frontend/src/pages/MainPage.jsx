import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "../components";
import api from "../axiosConfig";

export default function MainPage() {
   const navigate = useNavigate();

   const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
   if (!mapsApiKey) {
      console.error(
         "Google Maps API key is not defined in environment variables."
      );
   }

   useEffect(() => {
      ((g) => {
         var h,
            a,
            k,
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
                  e.set(
                     k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
                     g[k]
                  );
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
                           scale: 12,
                           fillColor: "#007BFF",
                           fillOpacity: 1,
                           strokeWeight: 2,
                           strokeColor: "#FFFFFF",
                        },
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
      const posts = [
         { route: "/post/1", lat: 40.76889, lng: -73.96505 },
         { route: "/post/2", lat: 40.76853, lng: -73.96495 },
         { route: "/post/3", lat: 40.7691, lng: -73.966 },
         { route: "/post/4", lat: 40.76798, lng: -73.9642 },
         { route: "/post/5", lat: 40.771, lng: -73.967 },
         { route: "/post/6", lat: 40.7667, lng: -73.9625 },
         { route: "/post/7", lat: 40.764, lng: -73.968 },
         { route: "/post/8", lat: 40.7725, lng: -73.9595 },
         { route: "/post/9", lat: 40.7615, lng: -73.9705 },
         { route: "/post/10", lat: 40.7578, lng: -73.9718 },
      ];

      async function addMarkers() {
         const { AdvancedMarkerElement } = await google.maps.importLibrary(
            "marker"
         );

         // Get the posts from the backend
         try {
            const response = await api.get("/posts");

            if (response.status === 200) {
               console.log(response);
               const posts = response.data;

               // Filter for location and postId
               const markerInfo = posts.map((post) => {
                  const [lat, lng] = post.locationCoordinates.split(",");
                  return {
                     route: `/post/${post.postId}`,
                     lat: parseFloat(lat),
                     lng: parseFloat(lng),
                  };
               });

               for (let i = 0; i < markerInfo.length; i++) {
                  const marker = new AdvancedMarkerElement({
                     map: map,
                     position: posts[i],
                     title: `Post ${i + 1}`,
                  });
                  marker.addListener("click", () => {
                     navigate(posts[i].route);
                  });
               }
            }
         } catch (error) {
            console.log(error);
         }
      }

      initMap();
   }, []);

   return (
      <div>
         <Navbar />
         <div id="map" className="w-full h-[800px]" region="us"></div>
      </div>
   );
}
