import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'news-aggregator';
}
