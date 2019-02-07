import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {TransactionService} from "../transaction.service";

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.scss']
})
export class AddTransactionDialogComponent implements OnInit {

  outcomeForm: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.outcomeForm = fb.group({
      'place_from': [null, Validators.required],
      'amount_from': [null, Validators.required],
      'amount_from_currency': [null, Validators.required],
      'description': [null, Validators.required],
      'date': [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.transactionService.createOutcome(form).subscribe(data => {
      console.log(data);
    });
  }
}
