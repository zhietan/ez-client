import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Geolocation, Geoposition, PositionError} from '@ionic-native/geolocation/ngx';
declare var google: any;
import { Platform } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { ServiceService } from 'src/app/servive/service.service';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.page.html',
  styleUrls: ['./marker.page.scss'],
})
export class MarkerPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;

  latitude;
  longitude;
  interval: any;

  client_lat : any
  client_long : any

  data_
  alamat : any;
  nama : any;
  status : any;
  durasi : any;
  phone : any;
  service : any;

  user_data : any;
  

  constructor(
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private geo : Geolocation,
    private socket : Socket,
    private api : ServiceService
    ) { }

  async ngOnInit() {
    let user_data = JSON.parse(localStorage.getItem(this.api.TOKEN_KEY));
    this.user_data = user_data.partner_id[0]
    console.log('usr data',this.user_data);

    
    this.connectSocket()
    // this.client_lat = '-6.152759777282929'
    // this.client_long = '106.68042021355919'

    this.latitude = this.route.snapshot.paramMap.get('lat')
    this.longitude = this.route.snapshot.paramMap.get('long')
    this.data_ =  JSON.parse(this.route.snapshot.paramMap.get('data'))
    console.log('data param',this.data_);
    
    this.geo.getCurrentPosition().then((resp) => {
     this.client_lat = resp.coords.latitude.toString()
     this.client_long =   resp.coords.longitude.toString()
     console.log('my position',this.client_lat, this.client_long);
      if(resp){
        
        this.updatePositionSocket()
        this.watchPosision()
        this.loadMap(parseFloat(this.latitude), parseFloat(this.longitude), parseFloat(this.client_lat), parseFloat(this.client_long));
      }
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ionViewDidLeave() {
    console.log('leaae');
    clearInterval(this.interval);
  }

  updatePositionSocket(){
    console.log('load partner location');
    this.socket.on("get-latlong", (resp) => {
      console.log('socket get loc',resp);
    })
  }

  async watchPosision(){
     this.geo.watchPosition().subscribe(position => {
      if ((position as Geoposition).coords != undefined) {
        var geoposition = (position as Geoposition);
        console.log('Latitude: ' + geoposition.coords.latitude + ' - Longitude: ' + geoposition.coords.longitude);
        
        this.client_lat = geoposition.coords.latitude
        this.client_long =   geoposition.coords.longitude
  
        this.socket.emit('lat-long', {
          lat : this.client_lat , 
          long : this.client_long, 
          partner_id : this.user_data.partner_id,
          name : this.user_data.name,
          phone : this.user_data.phone})

      } else { 
        var positionError = (position as PositionError);
        console.log('Error ' + positionError.code + ': ' + positionError.message);
      }
  });

    // let watch = await this.geo.watchPosition();
    // watch.subscribe((data) => {
    //   let datacoor = data.coords
    //   console.log('watch posision',data.coords.latitude);
    //   this.client_lat = data.coords.latitude
    //   this.client_long =   data.coords.longitude

    //   this.socket.emit('lat-long', 
    //   {
    //     lat : this.client_lat , 
    //     long : this.client_long, 
    //     partner_id : this.user_data.partner_id,
    //     name : this.user_data.name,
    //     phone : this.user_data.phone

    //   })
    // })
  }

  startDirection(){
   let link = 'http://maps.google.com/maps?saddr='+this.client_lat+','+this.client_long+'&daddr='+this.latitude+','+this.longitude+''
   window.open(link)
  }

  connectSocket(){
    console.log('connecting socket');
    this.socket.connect();
    this.socket.emit('is-online', { user: '1234' })
    
  }

  
  changeMarkerPosition(marker, map) {
    var latlng = new google.maps.LatLng(this.latitude, this.longitude);
    map.setCenter(latlng);
    marker.setPosition(latlng);
    console.log("Updating runner position");
  }

  loadMap(latOri, lngOri, latDest, lngDest) {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay = new google.maps.DirectionsRenderer();
    var bounds = new google.maps.LatLngBounds;

    var origin1 = { lat: parseFloat(latOri), lng: parseFloat(lngOri) };
    var destinationA = { lat: latDest, lng: lngDest };

    var destinationIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=D|FF0000|000000';
    var originIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=O|FFFF00|000000';
    var map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: latOri, lng: lngOri },
      disableDefaultUI: true,
      zoom: 100
    });

    const restPos = new google.maps.LatLng(latOri, lngOri);
    const custPos = new google.maps.LatLng(latDest, lngDest);

    const icon = {
      url: 'assets/imgs/ride.png',
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(5, 0), // origin
      anchor: new google.maps.Point(0, 5) // anchor
    };
    var marker = new google.maps.Marker({
      map: map,
      position: custPos,
      animation: google.maps.Animation.DROP,
      icon: icon,
    });
    var markerCust = new google.maps.Marker({
      map: map,
      position: restPos,
      animation: google.maps.Animation.DROP,
    });
    marker.setMap(map);
    markerCust.setMap(map);

    directionsDisplay.setMap(map);
    // directionsDisplay.setOptions({ suppressMarkers: true });
    directionsDisplay.setOptions({
      polylineOptions: {
        strokeWeight: 4,
        strokeOpacity: 1,
        strokeColor: 'red'
      },
      suppressMarkers: true
    });
    var geocoder = new google.maps.Geocoder;

    var service = new google.maps.DistanceMatrixService;

    service.getDistanceMatrix({
      origins: [origin1],
      destinations: [destinationA],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function (response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var outputDiv = document.getElementById('output');
        // outputDiv.innerHTML = '';
        // deleteMarkers(markersArray);

        var showGeocodedAddressOnMap = function (asDestination) {
          var icon = asDestination ? destinationIcon : originIcon;
          return function (results, status) {
            if (status === 'OK') {
              map.fitBounds(bounds.extend(results[0].geometry.location));
              // markersArray.push(new google.maps.Marker({
              //   map: map,
              //   position: results[0].geometry.location,
              //   icon: icon
              // }));
            } else {
              alert('Geocode was not successful due to: ' + status);
            }
          };
        };

        directionsService.route({
          origin: origin1,
          destination: destinationA,
          travelMode: 'DRIVING'
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });


        for (let i = 0; i < originList.length; i++) {
          let results = response.rows[i].elements;
          geocoder.geocode({ 'address': originList[i] },
            showGeocodedAddressOnMap(false));
          for (let j = 0; j < results.length; j++) {
            geocoder.geocode({ 'address': destinationList[j] },
              showGeocodedAddressOnMap(true));
          }
        }
      }
    });

    this.interval = setInterval(() => {
      // this.changeMarkerPosition(marker, map);
      // this.watchPosision()
      this.updatePositionSocket()
    }, 10000);
  }

  call(){
    window.open('tel:' + this.data_.phone);
  }
  

   

  


}
