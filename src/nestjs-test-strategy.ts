import { Test, TestingModule } from '@nestjs/testing';
import { TestMockMapper, TestSuiteStrategy } from '@ajdhefley/slim-suite-core';

export class NestJSTestStrategy<T> extends TestSuiteStrategy {
    constructor(readonly classType: any) {
        super();
    }

    async initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function) {
        const app: TestingModule = await Test.createTestingModule({
            imports: imports,
            providers: providers.concat([this.classType])
        }).compile();

        let cls = app.get<T>(this.classType);
        callback(cls, mockMapper);
    }
}
