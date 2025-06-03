import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'create', component: FormComponent },
    { path: 'edit/:id', component:  FormComponent }
];
