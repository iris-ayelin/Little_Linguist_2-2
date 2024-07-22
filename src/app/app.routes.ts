import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { MixedLettersComponent } from './mixed-letters-game/mixed-letters-game.component';
import { MatchWordsComponent } from './match-words-game/match-words-game.component';

export const routes: Routes = [
    {path: "", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "help", component: HelpComponent},
    {path: "choose-game", component: ChooseGameComponent},
    {path: "mixed-letters-game", component: MixedLettersComponent},
    {path: "match-words-game", component: MatchWordsComponent}
];

//
