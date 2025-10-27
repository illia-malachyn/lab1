import { Test, TestingModule } from '@nestjs/testing';
import { LightSensorsService } from './light-sensors.service';

describe('LightSensorsService', () => {
  let service: LightSensorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightSensorsService],
    }).compile();

    service = module.get<LightSensorsService>(LightSensorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});