import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle/vehicle.service';
import { vehicle } from '../Classes/vehicle';
import { range } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  selected_rating: number= 0
  selected_year: string=""
  selected_make: string[]=[]
  selected_city: string[]=[]

  makes: string[] = [
    'Honda',
    'Toyota',
    'Suzuki',
    'Mitsubishi',
    'Daihatsu',
    'Hyundai',
    'MG',
    'BMW',
    'Ford',
    'Changan'
  ]

  cities: string[]= [
    'Islamabad',
    'Lahore',
    'Quetta',
    'Karachi',
    'Peshawar'
  ]

  ratings: string[]= [
    '>= 1',
    '>= 2',
    '>= 3',
    '>= 4',
  ]

  years: string[]=[
    '1990 till 1995',
    '1995 till 2000',
    '2000 till 2005',
    '2005 till 2010',
    '2015 till 2020',
    '2020 till 2022'
  ]



  // years: number[] = range(1990,2022)

  
  selected_vehicles: vehicle[] = []
  vehicle_array:vehicle[] = []
  

  
  constructor(private vehicle_service:VehicleService) {}

  ngOnInit(): void {
    this.vehicle_array = this.vehicle_service.getVehicles()
    this.selected_vehicles = this.vehicle_array
  }

  cityChangeHandler(event: any, str: any){
    if (event.target.checked){
      if (!this.selected_city.includes(event.target.value)){
        this.selected_city.push(event.target.value);
      }
      console.log('selected cites: ',str,this.selected_city)
    }  
    else{
      this.selected_city.forEach((element,index)=>{
        if(element==event.target.value) this.selected_city.splice(index,1);
      });
      console.log('selected cities: ',this.selected_city)
    }
      this.updateComponent()
  }

  makeChangeHandler(event: any, cbox: any){
    if (event.target.checked){
      if (!this.selected_make.includes(event.target.value)){
        this.selected_make.push(event.target.value)
      }
      console.log('selected makes: ',this.selected_make)
    }
    else{
      this.selected_make.forEach((element,index)=>{
        if(element==event.target.value) this.selected_make.splice(index,1);
      });
      console.log('selected makes: ',this.selected_make)
    }
    // }
    // else{
    //   this.selected_make.forEach((element,index)=>{
    //     if(element==event.target.value) this.selected_make.splice(index,1);
    //  });
    this.updateComponent()
  }

  reset(event:any){
    this.selected_vehicles = this.vehicle_array
  }

  yearChangeHandler(event: any, cbox: any){
    this.selected_year = event.target.value;
  }

  ratingChangeHandler(event: any){
    this.selected_rating = event.target.value;
  }

  updateComponent(){
    if ((this.selected_make.length == 0) && (this.selected_city.length == 0) && (this.selected_rating == 0) && (this.selected_year == "")){
      this.selected_vehicles = this.vehicle_array
    }
    else{
        var temp_vehicles = this.vehicle_array //we keep all the vehicles in case no box has been selected
        this.selected_vehicles = []
        //var nols = true
        for(var i = 0; i < this.selected_city.length; i++){
          var ls = this.vehicle_array.filter(veh => veh.registered_city === this.selected_city[i])
          for (var j = 0; j < ls.length; j++){
            //nols = false
            this.selected_vehicles.push(ls[j])
          }
        }
        if ((this.selected_city.length == 0)){
          this.selected_vehicles = temp_vehicles //all vehicles selected if nothing was selected.
        }
        //But there is a problem. What if a checkbox was selected i.e selected_city.length >0 but there is
        //no vehicle with the selected city and therefore filter list should return empty?
        //we add another check for that.
        
        // now that our cities have been selected, we can move on to filtering by make.

        temp_vehicles = this.selected_vehicles //we keep all the selected vehicles up till now 
        this.selected_vehicles = []
        for(var i = 0; i < this.selected_make.length; i++){
          var ls = temp_vehicles.filter(veh => veh.brand === this.selected_make[i])
          for (var j = 0; j < ls.length; j++){
            //nols = false
            this.selected_vehicles.push(ls[j])
          }
        }
        if ((this.selected_make.length == 0)){
          this.selected_vehicles = temp_vehicles //all vehicles selected if nothing was selected.
        }    
    } 
    

  }


  //previous version of update component
  // updateComponent(){
  //   if ((this.selected_make.length == 0) && (this.selected_city.length == 0) && (this.selected_rating == 0) && (this.selected_year == "")){
  //     this.selected_vehicles = this.vehicle_array
  //   }
  //   else{
  //     if(this.make_selected == false){
  //       this.selected_vehicles = []
  //       for(var i = 0; i < this.selected_city.length; i++){
  //         var ls = this.vehicle_array.filter(veh => veh.registered_city === this.selected_city[i])
  //         for (var j = 0; j < ls.length; j++){
  //           this.selected_vehicles.push(ls[j])
  //         }
  //       }
  //     }

  //     else{
  //       var temp_vehicles = this.selected_vehicles
  //       this.selected_vehicles = []
  //       for(var i = 0; i < this.selected_city.length; i++){
  //         var ls = temp_vehicles.filter(veh => veh.registered_city === this.selected_city[i])
  //         for (var j = 0; j < ls.length; j++){
  //           this.selected_vehicles.push(ls[j])
  //         }
  //       }
  //     }

  //     if(this.selected_vehicles.length>0){
  //       var nols = true;
  //       var temp_vehicles = this.selected_vehicles
  //       this.selected_vehicles = []
  //       for(var i = 0; i < this.selected_make.length; i++){
  //         var ls = temp_vehicles.filter(veh => veh.brand === this.selected_make[i])
  //         if (ls.length>0){
  //           nols = false
  //           for (var j = 0; j < ls.length; j++){
  //             this.selected_vehicles.push(ls[j])
  //           }
  //         }  
  //       }
  //       if (nols == true)
  //         this.selected_vehicles = temp_vehicles
  //     }
  //     else{
  //       for(var i = 0; i < this.selected_make.length; i++){
  //         var ls = this.vehicle_array.filter(veh => veh.brand === this.selected_make[i])
  //         for (var j = 0; j < ls.length; j++){
  //           this.selected_vehicles.push(ls[j])
  //         }  
  //       }
  //       this.make_selected = true
  //     }
  //   }

  // }

  // update_component_by_city(){
  //   for(var i = 0; i < this.selected_city.length; i++){
  //     var ls = this.vehicle_array.filter(veh => veh.registered_city === this.selected_city[i])
  //        for (var j = 0; j < ls.length; j++){
  //          this.selected_vehicles.push(ls[j])
  //        }
  //   }
  // }

  // update_component_by_make(){
  //   for(var i = 0; i < this.selected_make.length; i++){
  //     var ls = this.vehicle_array.filter(veh => veh.brand === this.selected_make[i])
  //     for (var j = 0; j < ls.length; j++){
  //       this.selected_vehicles.push(ls[j])
  //     }  
  //   }
  // }

}
