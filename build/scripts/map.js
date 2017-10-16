'use strict';

$(document).ready(function () {
    if (!$('#map').length) {
        return;
    }
    var vm = this;
    //Step 1: initialize communication with the platform
    var platform = new window.H.service.Platform({
        app_id: 'DemoAppId01082013GAL',
        app_code: 'AJKnXv84fjrb0KIHawS0Tg',
        useCIT: true,
        useHTTPS: true
    });
    var defaultLayers = platform.createDefaultLayers();

    //Step 2: initialize a map  - not specificing a location will give a whole world view.
    var map = new window.H.Map(document.getElementById('map'), defaultLayers.normal.base, {
        center: {
            lat: 33.715367,
            lng: -117.794852
        },
        zoom: 15
    });

    setBaseLayer(map, platform);

    function setBaseLayer(map, platform) {

        var mapTileService = platform.getMapTileService({
            type: 'base'
        });

        var parameters = {};

        var tileLayer = mapTileService.createTileLayer('maptile', 'normal.day', 512, 'png8', //this is img type
        parameters);
        map.setBaseLayer(tileLayer);
    }

    var behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    /* behavior.disable(H.mapevents.Behavior.WHEELZOOM);*/
    var ui = window.H.ui.UI.createDefault(map, defaultLayers);
});
