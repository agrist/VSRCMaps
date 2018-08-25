import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { GeocodingService } from "../geocoding.service";
import { MapService } from "../map.service";
import { Location } from "../location";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from "jquery";
//import parse_georaster from "georaster";
//import GeoRasterLayer from "georaster-layer-for-leaflet";
//import * as L from "leaflet";
import * as L from "leaflet-geotiff";
import "rxjs/add/operator/catch";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  address: string;

  constructor(
    private mapService: MapService,
    private geocoder: GeocodingService
  ) {
    this.address = "";
  }

  ngOnInit() {

        // default map location
        const location = new Location();
        location.address = "Ventspils, Latvia";
        location.latlng = L.latLng(57.38, 21.6);
        //layer boundaries definitions
        var southWest = L.latLng(57.33, 21.55), //TODO check for correct bounding box, based off the actual coordinates
            northEast = L.latLng(57.5, 21.7),
            layerbounds = L.latLngBounds(southWest, northEast);
        var baseMaps = this.mapService.baseMaps;
        const map = L.map("map", {
          zoomControl: false,
          center: location.latlng,
          maxBounds: layerbounds,
          zoom: 12,
          zoomSnap: 1,
          minZoom: 8,
          maxZoom: 18,
          layers: [baseMaps.OpenStreetMap]
        });


          console.log(Object.keys(L));
        var url_to_geotiff_file = "http://127.0.0.1:8090/maska_pludi_2017_ct.tif";
        var url_to_shp_file = "http://127.0.0.1:8090/manualPolygons.geojson";
        var layer = L.leafletGeotiff(url_to_geotiff_file).addTo(map);

        var overlays = { // TODO this needs to be moved to a function where image overlays are prepared
                   "normal Geotiff": layer };
        L.control.zoom({ position: "topleft" }).addTo(map);
        var izskats = L.control.layers(baseMaps, overlays).addTo(map);
        L.control.scale().addTo(map);
        this.address = location.address;
        //move to function prepared from serverprovided list
        var firstImage = L.imageOverlay('http://127.0.0.1:8090/sub/test.jpg', layerbounds,{crossOrigin: true,show: false, opacity: 0.8}).addTo(map);
        izskats.addOverlay(firstImage, "Grumpy added a bit later");


        $.ajax({
        dataType: "json", //you shouldn't need to declare geojson
        url: url_to_shp_file,
        success: function(data) {
            var shape = new L.GeoJSON(data).addTo(map);
            //console.log(data);
            console.log(Object.keys(shape));
            //whatever you want to do with the data, alternatively you could use a closer around the ajax request to capture the data into a variable depending on how you have your code organized
           izskats.addOverlay(shape, "shape file example coverted via geojson");
        },
        error: function(e){
          console.log(e);
        }
        });



      };


      let overlayLayerAdition = function(map, izskats){
        $.ajax({
        dataType: "json", //you shouldn't need to declare geojson
        url: url_to_shp_file,
        success: function(data) {
            var shape = new L.GeoJSON(data).addTo(map);
            //console.log(data);
            console.log(Object.keys(shape));
            //whatever you want to do with the data, alternatively you could use a closer around the ajax request to capture the data into a variable depending on how you have your code organized
           izskats.addOverlay(shape, "shape file example coverted via geojson");
        },
        error: function(e){
          console.log(e);
        }
        });

      }


}
