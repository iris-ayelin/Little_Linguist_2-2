import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { MatchWordsComponent } from './match-words-game/match-words-game.component';
import { MixedLettersGameComponent } from './mixed-letters/mixed-letters-game.component';
import { WordSorterGameComponent } from './word-sorter-game/word-sorter-game.component';

export const routes: Routes = [
    {path: "", component: DashboardComponent},
    {path: "admin", component:CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "help", component: HelpComponent},
    {path: "choose-game", component: ChooseGameComponent},
    {path: "match-words-game", component: MatchWordsComponent},
    {path: "mixed-letters-game/:id", component: MixedLettersGameComponent},
    {path: "lets-play", component: ChooseGameComponent},
    {path: "word-sorter-game/:id", component: WordSorterGameComponent}
];

