import { Injectable } from '@nestjs/common';
import { CreateLightSensorDto } from './dto/create-light-sensor.dto';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto';
import { LightSensor } from './entities/light-sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LightSensorsService {
  constructor(
    @InjectRepository(LightSensor)
    private readonly lightSensorRepository:
      Repository<LightSensor>,
  ) { }


  async create(dto: CreateLightSensorDto) {
    const record =
      this.lightSensorRepository.create(dto);
    return await this.lightSensorRepository.save(record);
  }

  async findAll() {
    return await this.lightSensorRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }


  async findOne(id: string) {
    return await this.lightSensorRepository.find({
      where: { id },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }


  async update(id: string, dto: UpdateLightSensorDto) {
    return await this.lightSensorRepository.update(id, dto);
  }

  async remove(id: string) {
    return await this.lightSensorRepository.delete(id);
  }
}
