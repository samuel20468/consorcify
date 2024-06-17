"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const Map = () => {
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: GOOGLE_MAPS_KEY as string,
                version: "weekly",
            });

            const { Map } = await loader.importLibrary("maps");
            const { AdvancedMarkerElement } = (await google.maps.importLibrary(
                "marker"
            )) as google.maps.MarkerLibrary;

            const position = {
                lat: 37.7749,
                lng: -122.4194,
            };

            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 12,
                mapId: "MY_NEXTJS_MAP_ID",
            };

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            const marker = new AdvancedMarkerElement({
                map,
                position,
            });
        };
        initMap();
    }, []);

    return (
        <div
            style={{ height: "100%", width: "100%", borderRadius: "40px" }}
            ref={mapRef}
        />
    );
};

export default Map;
