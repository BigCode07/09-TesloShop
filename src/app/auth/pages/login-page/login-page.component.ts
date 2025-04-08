import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarningAlertComponent } from '../../components/warning-alert/warning-alert.component';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, WarningAlertComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 5000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;
    console.log({ email, password });
  }
}
