import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html'
})
export class PersonEditComponent implements OnInit {

  personForm: FormGroup;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.personForm = this.fb.group({
      name: [''],
      email: [''],
      age: ['']
    });

    this.personService.getPerson(this.id).subscribe(data => {
      this.personForm.patchValue(data);
    });
  }

  onSubmit() {
    this.personService.updatePerson(this.id, this.personForm.value)
      .subscribe(() => {
        this.router.navigate(['/people']);
      });
  }
}