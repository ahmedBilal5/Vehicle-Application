import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vehicle } from '../Classes/vehicle';
import { VehicleService } from '../services/vehicle/vehicle.service';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  veh!: vehicle;
  constructor(private activatedRoute:ActivatedRoute, private vs: VehicleService) { 
    activatedRoute.params.subscribe((params)=> {
      if(params["id"]){
        this.veh = vs.getVehiclebyId(params["id"]);
      }
    })
  }
  //constructor(){}



  ngOnInit(): void {
  }

}
