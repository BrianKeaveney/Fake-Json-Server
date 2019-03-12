import { Car } from './../car';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  @Output() addCarEE: EventEmitter<any> = new EventEmitter();
  show: boolean = false;

  constructor() { }

  addCar(make:string, model:string, year:string, imageURL:string):boolean {
    let tempCar = new Car(make, model, year, imageURL);
    this.addCarEE.emit(tempCar);
    return false;
  }
  ngOnInit() {
  }

}
