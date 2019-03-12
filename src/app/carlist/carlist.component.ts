import { ICar } from './../icar';
import { CarApiService } from './../car-api.service';
import { Component, OnInit } from '@angular/core';
import { Car } from '../car';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css'],
  providers: [CarApiService]
})
export class CarlistComponent implements OnInit {

  carsData: ICar[];
  constructor(private _carApiService: CarApiService) { }

  ngOnInit() {
    this._carApiService.getCarData().subscribe(carsData =>
      { this.carsData = carsData});
  }

  addCar(evt){
    this.carsData.push(evt);
  }

  addTheCar(make:string, model:string, year:string, imageUrl:string): boolean{
    let tempCar:ICar;
    tempCar = new Car(make,model,year,imageUrl);
    this._carApiService.addCarData(tempCar);
    return false;
  }

}
