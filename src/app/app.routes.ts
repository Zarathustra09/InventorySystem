import { Routes } from '@angular/router';
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {LoginComponent} from "./Components/login/login.component";
import {RegistrationComponent} from "./Components/registration/registration.component";
import {ProductsComponent} from "./Components/products/products.component";
import {TransactionsComponent} from "./Components/transactions/transactions.component";
import {CreateProductComponent} from "./Components/create-product/create-product.component";
import {UpdateProductComponent} from "./Components/update-product/update-product.component";
import {CreateTransactionComponent} from "./Components/create-transaction/create-transaction.component";
import {UpdateTransactionComponent} from "./Components/update-transaction/update-transaction.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'create-product', component: CreateProductComponent},
  {path: 'update-product/:id', component: UpdateProductComponent},
  {path: 'create-transaction', component: CreateTransactionComponent},
  {path: 'update-transaction/:id', component: UpdateTransactionComponent},

];
