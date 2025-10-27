import { Test, TestingModule } from '@nestjs/testing';
import { LightSensorsController } from './light-sensors.controller';
import { LightSensorsService } from './light-sensors.service';

describe('LightSensorsController', () => {
  let controller: LightSensorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightSensorsController],
      providers: [LightSensorsService],
    }).compile();

    controller = module.get<LightSensorsController>(LightSensorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
