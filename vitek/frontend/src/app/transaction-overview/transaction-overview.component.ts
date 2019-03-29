import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatChipList, MatDialog} from "@angular/material";
import {AddTransactionDialogComponent} from "../add-transaction-dialog/add-transaction-dialog.component";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {TransactionService} from "../transaction.service";
import {TagsService} from "../tags.service";

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

  @ViewChild('tagsList')
  tagsList: MatChipList;

  public transactionsArray: any = [];

  public tags: any = [];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private transactionService: TransactionService, private tagsService: TagsService) {
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
    this.getTags();
  }

  getTransactions() {
    this.transactionService.list().subscribe(data => this.transactionsArray = data)
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

  private getTags() {
    this.tagsService.list().subscribe( data => this.tags = data);
  }
}
