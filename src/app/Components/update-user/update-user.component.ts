import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userId: number;
  userForm: FormGroup;
  roles: { id: number, name: string }[] = [
    { id: 0, name: 'User' },
    { id: 1, name: 'Admin' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userId = this.route.snapshot.params['id'];
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.userForm.patchValue(user);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: User = this.userForm.value;
      this.userService.updateUser(this.userId, updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully', response);
          this.router.navigate(['/users']); // Navigate back to users list after update
        },
        (error) => {
          console.error('Error updating user', error); // Handle error (e.g., display error message)
        }
      );
    }
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(this.userId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.router.navigate(['/users']); // Navigate back to users list after deletion
        },
        (error) => {
          console.error('Error deleting user', error); // Handle error (e.g., display error message)
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']); // Navigate back to users list without updating or deleting
  }
}
