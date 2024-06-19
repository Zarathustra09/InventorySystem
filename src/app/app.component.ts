import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./Services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ProductService} from "./Services/product.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService,ProductService]
})
export class AppComponent {
  title = 'InventorySystem';
}
