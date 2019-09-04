import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { AdmobProService } from './services/admobfree.service';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule, FormsModule,ReactiveFormsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AdMobPro,
        AdmobProService,
        SQLite,
        SQLitePorter,
        InAppPurchase

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
