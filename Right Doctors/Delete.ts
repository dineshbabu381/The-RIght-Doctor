import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-delete',
  template: `
    <h2>Are you sure you want to delete this person?</h2>
    <button (click)="delete()">Yes</button>
    <button (click)="cancel()">No</button>
  `
})
export class PersonDeleteComponent implements OnInit {

  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  delete() {
    this.personService.deletePerson(this.id).subscribe(() => {
      this.router.navigate(['/people']);
    });
  }

  cancel() {
    this.router.navigate(['/people']);
  }
}