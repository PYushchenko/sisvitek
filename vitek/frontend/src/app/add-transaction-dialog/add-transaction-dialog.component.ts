import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {TransactionService} from "../transaction.service";
import {PlaceService} from "../place.service";

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.scss']
})
export class AddTransactionDialogComponent implements OnInit {

  outcomeForm: FormGroup;

  places: any = [];

  constructor(private fb: FormBuilder, private transactionService: TransactionService, private placeService: PlaceService) {
    this.outcomeForm = fb.group({
      'place_from': [null, Validators.required],
      'amount_from': [null, Validators.required],
      'amount_from_currency': [null, Validators.required],
      'description': [null, Validators.required],
      'date': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getPlaces()
  }

  private getPlaces() {
    this.placeService.list().subscribe(data => {
      this.places = data['places'];
    })
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.transactionService.createOutcome(form).subscribe(data => {
      console.log(data);
    });
  }

  displayFn(place?: any): string | undefined {
    return place ? place.name : undefined;
  }
}
