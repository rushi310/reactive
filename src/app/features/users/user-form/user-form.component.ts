import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/service/api.service';
import { Iuser } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  UserForm!: FormGroup;
  IsInEditMode = false;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createUserForm();
    this.handleSameAddress();

    this.userId = this.route.snapshot.params['id'];

    if (this.userId) {
      this.IsInEditMode = true;
      this.getUserById(this.userId);
    }
  }

  get skillsArr(): FormArray {
    return this.UserForm.get('skills') as FormArray;
  }

  createUserForm(): void {
    this.UserForm = this.fb.group({
      name: ['', Validators.required],

      role: ['', Validators.required],

      experience: ['', Validators.required],

      status: [null, Validators.required],

      description: ['', Validators.required],

      imageUrl: ['', Validators.required],

      currentAddress: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipcode: ['', Validators.required],
      }),

      permanentAddress: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipcode: ['', Validators.required],
      }),

      isAddSame: [false],

      skills: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  handleSameAddress(): void {
    const isAddSame = this.UserForm.get('isAddSame')!;
    const currentAddress = this.UserForm.get('currentAddress')!;
    const permanentAddress = this.UserForm.get('permanentAddress')!;

    isAddSame.valueChanges.subscribe((same: boolean) => {
      if (same) {
        permanentAddress.patchValue(currentAddress.value);
        permanentAddress.disable();
      } else {
        permanentAddress.enable();
      }
    });

    currentAddress.valueChanges.subscribe((value) => {
      if (isAddSame.value) {
        permanentAddress.patchValue(value);
      }
    });
  }

  newSkills(): void {
    this.skillsArr.push(this.fb.control('', Validators.required));
  }

  onRemove(index: number): void {
    this.skillsArr.removeAt(index);
  }

  onAddUser(): void {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched();
      return;
    }

    const user: Iuser = {
      ...this.UserForm.getRawValue(),
      createdAt: new Date().toISOString(),
    };

    this.apiService.addUser(user).subscribe({
      next: () => {
        alert('User added successfully');
        this.router.navigate(['/users']);
      },
      error: (err) => console.log(err),
    });
  }

  getUserById(id: string): void {
    this.apiService.getUserById(id).subscribe({
      next: (res: any) => {
        this.UserForm.patchValue(res);

        this.skillsArr.clear();

        (res.skills || []).forEach((skill: string) => {
          this.skillsArr.push(this.fb.control(skill, Validators.required));
        });
      },
      error: (err) => console.log(err),
    });
  }

  onUpdateUser(): void {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched();
      return;
    }

    const user: Partial<Iuser> = {
      ...this.UserForm.getRawValue(),
    };

    this.apiService.updateUser(this.userId, user).subscribe({
      next: () => {
        alert('User updated successfully');
        this.router.navigate(['/users']);
      },
      error: (err) => console.log(err),
    });
  }
}
