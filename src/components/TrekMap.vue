<template>
    <div id="map" class="h-128">
    </div>
</template>

<script>
export default {
    props: {
        locations: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            access_token: import.meta.env.VITE_APP_MAPBOX_TOKEN,
            map_style: import.meta.env.VITE_APP_MAPBOX_STYLE,
            map: {},
            center: [0, 0]
        };
    },
    mounted() {
        this.createMap()
    },

    methods: {
        async createMap() {
            try {
                mapboxgl.accessToken = this.access_token;
                this.map = new mapboxgl.Map({
                    container: "map",
                    style: this.map_style,
                    scrollZoom: false,
                    center: this.center
                });
                const bounds = new mapboxgl.LngLatBounds();

                this.locations.forEach(loc => {
                    // Create Marker
                    const elm = document.createElement('div');
                    elm.className = 'marker';

                    // Add Marker
                    new mapboxgl.Marker({
                        element: elm,
                        anchor: 'bottom'
                    }).setLngLat(loc.coordinates).addTo(this.map);

                    // Add Popup
                    new mapboxgl.Popup({ offset: 30 })
                        .setLngLat(loc.coordinates)
                        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
                        .addTo(this.map);

                    // Extend map bounds to include all locations
                    bounds.extend(loc.coordinates);
                });

                this.map.fitBounds(bounds, {
                    padding: {
                        top: 150,
                        bottom: 50,
                        left: 100,
                        right: 100
                    }
                });
                this.center = [this.map.getBounds()._ne.lng, this.map.getBounds()._ne.lat];

            } catch (err) {
                console.log("map error", err);
            }
        },
    },
}
</script> 