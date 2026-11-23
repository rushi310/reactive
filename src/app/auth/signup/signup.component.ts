
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';
import { ROLES } from '../../shared/models/role.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMsg = '';
  roles = ROLES;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required]
    });
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { email, password, role } = this.signupForm.value;

    this.authService.signup(email, password, role).subscribe({
      next: (res) => {
        alert('Account created successfully!');

        this.router.navigate(['/login']);
      },
error: (err) => {
  console.error('Signup error:', err);
  this.errorMsg = err.error?.error?.message || 'Signup failed';
}
    });
  }

}
