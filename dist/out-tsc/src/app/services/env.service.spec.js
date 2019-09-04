import { TestBed } from '@angular/core/testing';
import { EnvService } from './env.service';
describe('EnvService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(EnvService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=env.service.spec.js.map