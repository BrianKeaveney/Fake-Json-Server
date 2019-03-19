import { ICar } from './icar';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  private _siteURL = 'http://localhost:3000/car_data';

  carsDataCollection: AngularFirestoreCollection<ICar>;
  allCarsData: ICar[];
  carsData;

  errorMessage: string;

  constructor(private _http: HttpClient, private _afs: AngularFirestore) { 
    this.carsDataCollection = _afs.collection<ICar>("cars_data");
    // this.addAllProducts();
  }

  getCarData(): Observable<ICar[]> {
    this.carsData = this.carsDataCollection.valueChanges();

    this.carsDataCollection.valueChanges().subscribe(data => console.log("getCarsData: " + JSON.stringify(data)))
    return this.carsData;
  }

  private handleError(err: HttpErrorResponse) {
    console.log('CarApiService: ' + err.message);
    return Observable.throw(err.message);   
  }

  addCarData(car): void {
    this.carsDataCollection.add(car);
  }

  addAllProducts() {
    this._http.get<ICar[]>(this._siteURL).subscribe(
      carsData => {
        this.allCarsData = carsData;
        for(let car of this.allCarsData) {
          console.log("Adding: Make: " + car.make + "- Model: " + car.model);
          this.carsDataCollection.add(car);
        }
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
