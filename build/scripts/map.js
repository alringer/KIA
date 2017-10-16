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

    vm.centerMarkers = [];
    vm.icon = new window.H.map.Icon('1.png');
    vm.icon1 = new window.H.map.Icon('2.png');
    vm.icon2 = new window.H.map.Icon('3.png');

    vm.addMarkerToGroup = function (map, markers) {

        markers.forEach(function (val, key) {
            var container = new window.H.map.Marker({
                lat: val.lat,
                lng: val.lng
            }, {
                icon: val.icon
            });

            map.addObject(container);
            container.setData(
            //creating bubbleInfo data.
            ' <div class="main_div"><div class="col-xs-12">\n                  <div class="row"><div class="panel panel-default panel_head">\n                  <div class="panel-body"> <h5><b>My Niro</b></h5><div class="pull-right">\n                  <h5 class="text-danger"><b>Check For Software Update</b><span class="glyphicon glyphicon-cog glyph-set"></span> </h5></div>\n                  <div class="col-xs-12 pull-left sub_div">\n                  <div class="col-xs-3">\n                  <div class="row">\n                  <h6><b>MILEAGE</b></h6>\n                  <h5><b>' + val.mileage + 'mi</b></h5>\n                  </div>\n                  </div>\n                  <div class="col-xs-3">\n                  <div class="row">\n                  <h6><b>NEXT SERVICE IN</b></h6>\n                  <h5><b>' + val.service + 'mi</b></h5>\n                  </div>\n                  </div>\n                  <div class="col-xs-4">\n                  <div class="row">\n                  <h6><b>DIAGNOSTIC ISSUES</b></h6>\n                  <h5><b>' + val.issue + '</b></h5>\n                  </div>\n                  </div>\n                  </div>\n\n                  <div class="col-xs-12 pull-left sub_div">\n                  <div class="col-xs-3">\n                  <div class="row">\n                  <h6><b>CHARGE LEVEL</b></h6>\n                  <h5><b>' + val.chargelevel + '%</b></h5>\n                  </div>\n                  </div>\n                  <div class="col-xs-3">\n                  <div class="row">\n                  <h6><b>BATTERY STATUS</b></h6>\n                  <h5><b>' + val.batStatus + '</b></h5>\n                  </div>\n                  </div>\n                  <div class="col-xs-4">\n                  <div class="row">\n                  <h6><b>DRIVING RANGE</b></h6>\n                  <h5><b>' + val.range + 'mi</b></h5>\n                  </div>\n                  </div>\n                  </div></div>\n                  <div class="col-xs-12 pull-left connect_modify">\n                  <div class="col-xs-4 pull-left"> <h5><b>UVO Connected</b></h5> </div>\n                  <div class="col-xs-6 "><h5 class="pull-right"><b>Last Refreshed 18hrs ago</b></h5></div></div></div></div></div></div>');
            vm.centerMarkers.push(container);
        });

        var group = new window.H.map.Group();
        group.addObjects(vm.centerMarkers);
        map.addObject(group);
        map.setViewBounds(group.getBounds());
        group.addEventListener('tap', function (evt) {
            var bubble = new window.window.H.ui.InfoBubble(evt.target.getPosition(), {
                content: evt.target.getData()
            });
            var previousBubbles = ui.getBubbles();
            previousBubbles.forEach(function (bubs) {
                ui.removeBubble(bubs);
            });
            ui.addBubble(bubble);
            map.setCenter(evt.target.getPosition());
        }, false);
    };

    vm.initMaps = function () {
        //need to call BE API to fetch data, this is just mock data.
        vm.markers = [{
            lat: 33.715367,
            lng: -117.794852,
            icon: vm.icon,
            mileage: "15,919",
            service: "6,234",
            issue: "NO",
            chargelevel: 31,
            batStatus: "Charging",
            range: 72,
            id: 1
        }, {
            lat: 33.717422,
            lng: -117.809355,
            icon: vm.icon1,
            mileage: "17,457",
            service: "7,454",
            issue: "NO",
            chargelevel: 75,
            batStatus: "No Charging",
            range: 67,
            id: 2
        }, {
            lat: 33.714441,
            lng: -117.781481,
            icon: vm.icon2,
            mileage: "18,889",
            service: "8,456",
            issue: "NO",
            chargelevel: 100,
            batStatus: "Battery Full",
            range: 85,
            id: 3
        }];
        vm.addMarkerToGroup(map, vm.markers);
    };
    vm.initMaps();

    var behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    /* behavior.disable(H.mapevents.Behavior.WHEELZOOM);*/
    var ui = window.H.ui.UI.createDefault(map, defaultLayers);
});
