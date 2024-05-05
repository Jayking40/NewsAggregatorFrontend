import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NzPaginationModule,],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  articles: any[] = [];
  totalPages = 0;
  currentPage = 1;
  pageSize = 10;
  isLoading: boolean = false;

  constructor(private newsService: NewsService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getTopHeadlines(this.currentPage);
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  getTopHeadlines(pageNumber: number) {
    this.isLoading = true;
    this.newsService.getTopHeadlines(pageNumber, this.pageSize)
    .pipe(
      delay(5000)
    )
      .subscribe(
        (data) => {
          this.articles = this.articles.concat(data.articles);
          this.totalPages = Math.ceil(data.totalResults / this.pageSize);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching top headlines:', error);
          this.isLoading = false;
        }
      );
  }

  onScroll() {
    if (this.isLoading || this.currentPage >= this.totalPages) {
      return;
    }

    this.isLoading = true;
    this.getTopHeadlines(++this.currentPage);
  }

  searchByKeyword(keyword: string) {
    this.currentPage = 1;
    this.articles = [];

    if (this.newsService.getArticlesByKeyword) {
      this.newsService.getArticlesByKeyword(keyword, this.currentPage, this.pageSize)
        .subscribe(
          (data) => {
            this.articles = data.articles;
            this.totalPages = Math.ceil(data.totalResults / this.pageSize);
          },
          (error) => {
            console.error('Error fetching articles by keyword:', error);
          }
        );
    } else {
      this.newsService.getArticlesByKeyword(keyword).subscribe(
        (data) => {
          this.articles = data.articles;
          this.totalPages = Math.ceil(this.articles.length / this.pageSize);
        },
        (error) => {
          console.error('Error fetching articles by keyword:', error);
        }
      );
    }
  }

  addToFavorites(payload: any) {

  }
}
