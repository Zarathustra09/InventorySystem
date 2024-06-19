import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/user.model";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../Services/auth.service";
import {ProductsComponent} from "../products/products.component";


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductsComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  eventCount: number = 0;

  constructor(private userService: UserService, private router: Router,
              private authService: AuthService) {}

  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  editUser(id: number): void {
    if (id !== undefined) {
      this.router.navigate(['/update-user', id]);
    } else {
      console.error('User id is undefined');
    }
  }

  deleteUser(id: number): void {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(id).subscribe(
          () => {
            console.log(`User with id ${id} deleted successfully`);
            // Refresh user list after deletion
            this.users = this.users.filter(user => user.id !== id);
          },
          (error) => {
            console.error(`Error deleting user with id ${id}`, error);
          }
        );
      }
    } else {
      console.error('User id is undefined');
    }
  }

  getRoleName(role: number): string {
    return role === 0 ? 'User' : role === 1 ? 'Admin' : 'Unknown';
  }


  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
  }
}
