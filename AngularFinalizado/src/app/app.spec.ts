import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';  // ← Cambiar App por AppComponent

describe('AppComponent', () => {  // ← Cambiar App por AppComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],  // ← Cambiar App por AppComponent
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);  // ← Cambiar aquí
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);  // ← Cambiar aquí
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, tp-angular-migracion');
  });
});