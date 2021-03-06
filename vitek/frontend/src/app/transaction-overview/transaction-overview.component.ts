import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatChip, MatChipList, MatChipSelectionChange, MatDialog} from "@angular/material";
import {AddTransactionDialogComponent} from "../add-transaction-dialog/add-transaction-dialog.component";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {TransactionService} from "../transaction.service";
import {TagsService} from "../tags.service";
import {Transaction} from "../models/transaction";

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {

  allColumnsToDisplay = ['date', 'place_from', 'amount_from', 'place_to', 'amount_to', 'description'];
  outcomeColumnsToDisplay = ['date', 'place_from', 'amount_from', 'description'];

  allForm: FormGroup;
  outcomeForm: FormGroup;

  public transactionsArray: Transaction[] = [];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private transactionService: TransactionService, private tagsService: TagsService) {
    this.tagsService.selectedTags$.subscribe(selectedTags => {
      this.getTransactions(selectedTags);
    })
  }

  ngOnInit() {
    this.allForm = this.fb.group({
      'place_from': [null, Validators.required],
      'amount_from': [null, Validators.required],
      'amount_from_currency': [null, Validators.required],
      'place_to': [null, Validators.required],
      'amount_to': [null, Validators.required],
      'amount_to_currency': [null, Validators.required],
      'description': [null, Validators.required],
      'date': [null, Validators.required],
    });
    this.outcomeForm = this.fb.group({
      'place_from': [null, Validators.required],
      'amount_from': [null, Validators.required],
      'amount_from_currency': [null, Validators.required],
      'description': [null, Validators.required],
      'date': [null, Validators.required],
    });
    this.getTransactions();
  }

  getTransactions(selectedTags: number[] = []) {
    this.transactionService.list(selectedTags).subscribe(data => this.transactionsArray = data)
  }

  openAddTransactionDialog() {
    const dialogRef = this.dialog.open(AddTransactionDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.transactionService.createOutcome(form).subscribe(data => {
      console.log(data);
    });
  }
}
