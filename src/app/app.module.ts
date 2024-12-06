import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo/todo.service';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { TictactoeBoardComponent } from './tictactoe/board/board.component';
import { TictactoeSquareComponent } from './tictactoe/square/square.component';
import { AppRoutingModule } from './app-routing.module';
import { KanbanComponent } from './kanban/kanban.component';
import { KanbanBoardComponent } from './kanban/board/board.component'; 
import { DragDropModule } from '@angular/cdk/drag-drop'
import { KanbanBoardListComponent } from './kanban/board-list/board-list.component';
import { StoreModule } from '@ngrx/store';
import { LogsComponent } from './logs/logs.component';
import { NavComponent } from './nav/nav.component';
import { CropperComponent } from './cropper/cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LoginComponent } from './auth/login/login.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');  // Path to your JSON files
}
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TictactoeComponent,
    TictactoeBoardComponent,
    TictactoeSquareComponent,
    KanbanComponent,
    KanbanBoardComponent,
    KanbanBoardListComponent,
    LogsComponent,
    NavComponent,
    CropperComponent,
    LoginComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    ImageCropperModule,
    StoreModule.forRoot({}, {}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
