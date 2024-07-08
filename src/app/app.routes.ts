import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { FirstGameComponent } from './first-game/first-game.component';
import { SecondGameComponent } from './second-game/second-game.component';

export const routes: Routes = [
    {path: "", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "help", component: HelpComponent},
    {path: "choose-game", component: ChooseGameComponent},
    {path: "first-game", component: FirstGameComponent},
    {path: "second-game", component: SecondGameComponent}
];

//
