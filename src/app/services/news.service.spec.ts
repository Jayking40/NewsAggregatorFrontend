import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch top headlines with pagination', () => {
    const pageNumber = 1;
    const pageSize = 10;
    const mockData = {
      articles: [
        { title: 'Article 1' },
        { title: 'Article 2' }
      ]
    };

    service.getTopHeadlines(pageNumber, pageSize).subscribe(data => {
      expect(data.articles.length).toBe(2);
      expect(data.articles[0].title).toBe('Article 1');
      expect(data.articles[1].title).toBe('Article 2');
    });

    const req = httpMock.expectOne(`${service.apiUrl}/top-headlines?country=us&apiKey=${service.apiKey}&page=${pageNumber}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
