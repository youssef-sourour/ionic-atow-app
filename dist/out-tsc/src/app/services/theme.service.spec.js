import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
describe('ThemeService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ThemeService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=theme.service.spec.js.map