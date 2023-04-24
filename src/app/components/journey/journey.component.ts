import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors} from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';


//servicios
import { JourneyService } from 'src/app/services/journey.service';

//interfaces
import { Flight } from 'src/app/interfaces/flight';


@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})



export class JourneyComponent {

  journeyForm!: FormGroup;
  textBoton:string = 'Guardar';
  departureValue: string = '';
  arrivalValue: string = '';
  flights = [];
  journey = {};
  totalPriceJourney = 0;
  currencyDefault = 'USD';
  currencySelect = '';
  isLoading = false;
  active:boolean = false;


  //data table
  dataSource! : MatTableDataSource<any>;
  displayedColumns: string[] = ['origin', 'destination', 'price', 'carrier', 'flightNumber']; 

  
  constructor(
    private formBuilder: FormBuilder,
    private journeyService:JourneyService
  
  ){

  }

  ngOnInit(): void {
    this.journeyForm = this.formBuilder.group({
      departureStation: ['', [Validators.required,Validators.maxLength(3),Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
      arrivalStation: ['', [Validators.required,Validators.maxLength(3),Validators.minLength(3)]]
    });


  }
  convertCurrency(){
    if(this.currencySelect != ''){
      var currency = this.currencySelect;
      

    }else{
      alert('Select a Currency');
    }
  }

  getJourney() {

    this.active = true;
    var journey = this.journeyForm.value;
    if(this.journeyForm.valid){

      this.journeyService.getJurney(journey).subscribe(
        response => {
          this.active = false;
          if(response.Journey.Price != 0){
            this.totalPriceJourney = response.Journey.Price;
            this.flights = response.Journey.Flights;
            this.journey = response.Journey;
            
          }else{
            this.active = false;
            this.flights = [];
            alert('No flights found for the indicated route');
          }               

          this.dataSource = new MatTableDataSource<Flight>(this.flights);
        
        },
        error =>{
          console.log(error); 
          alert('Error Internal');         
          
        }
      );
      
    }
  }

  //control de errores
  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'Field is required';
    }
    if (errors.maxlength) {
      return 'Field cannot be longer than 3 characters';
    }

    if (errors.minlength) {
      return 'Field cannot be less than 3 characters';
    }

    if (errors.pattern) {
      return 'You must enter only letters';
    }
    // add additional error checks here if needed
    return 'Invalid Field';
  }

  //control de mayusculas
  onDepartureKeyUp() {
    this.departureValue = this.departureValue.toUpperCase();
  }
  onArrivalKeyUp() {
    this.arrivalValue = this.arrivalValue.toUpperCase();
  } 

}
