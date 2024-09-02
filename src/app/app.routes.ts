import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { MatchWordsComponent } from './matching-game-module/match-words-game/match-words-game.component';
import { MixedLettersGameComponent } from './mixed-letters-game/mixed-letters-game.component';
import { SortedWordsGameComponent } from './sorted-words-game/sorted-words-game.component';
import { MixedLettersGameResultsComponent } from './mixed-letters-game-results/mixed-letters-game-results.component';
import { SortedWordsGameResultsComponent } from './sorted-words-game-results/sorted-words-game-results.component';
import { DisplaySingleWordComponent } from './matching-game-module/model/display-single-word/display-single-word.component';


export const routes: Routes = [
    {path: "", component: DashboardComponent},
    {path: "admin", component:CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "help", component: HelpComponent},
    {path: "match-words-game/:id", component: MatchWordsComponent,},
    {path: "mixed-letters-game/:id", component: MixedLettersGameComponent},
    {path: "sorted-words-game/:id", component: SortedWordsGameComponent },
    {path: "lets-play", component: ChooseGameComponent},
    {path: "mixed-letters-game-results", component: MixedLettersGameResultsComponent},
    {path: "sorted-words-game-results", component: SortedWordsGameResultsComponent},
    {path: "display-single-word", component: DisplaySingleWordComponent},

];

