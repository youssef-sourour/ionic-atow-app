import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
var routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
    { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
    { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
    { path: 'twirl-and-tip', loadChildren: './pages/twirl-and-tip/twirl-and-tip.module#TwirlAndTipPageModule' },
    { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
    { path: 'basic', loadChildren: './pages/games/basic/basic.module#BasicPageModule' },
    { path: 'assorted', loadChildren: './pages/games/assorted/assorted.module#AssortedPageModule' },
    { path: 'category', loadChildren: './pages/games/category/category.module#CategoryPageModule' },
    { path: 'drop', loadChildren: './pages/games/drop/drop.module#DropPageModule' },
    { path: 'placement', loadChildren: './pages/games/placement/placement.module#PlacementPageModule' },
    { path: 'hint', loadChildren: './pages/games/hint/hint.module#HintPageModule' },
    { path: 'listed-letters', loadChildren: './pages/games/listed-letters/listed-letters.module#ListedLettersPageModule' },
    { path: 'if-you-dare', loadChildren: './pages/games/if-you-dare/if-you-dare.module#IfYouDarePageModule' },
    { path: 'edit-profile', loadChildren: './pages/auth/edit-profile/edit-profile.module#EditProfilePageModule' },
    { path: 'choose-play-option', loadChildren: './pages/choose-play-option/choose-play-option.module#ChoosePlayOptionPageModule' },
    { path: 'score', loadChildren: './pages/games/score/score.module#ScorePageModule' },
    { path: 'shops', loadChildren: './pages/shops/shops.module#ShopsPageModule' },
    { path: 'game-result', loadChildren: './pages/game-result/game-result.module#GameResultPageModule' },
    { path: 'free-play', loadChildren: './pages/free-play/free-play.module#FreePlayPageModule' },
    { path: 'keyboard', loadChildren: './pages/games/keyboard/keyboard.module#KeyboardPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map