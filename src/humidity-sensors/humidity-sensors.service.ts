import { Injectable } from '@nestjs/common';
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto';
import { HumiditySensor } from './entities/humidity-sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HumiditySensorsService {
  constructor(
    @InjectRepository(HumiditySensor)
    private readonly humiditySensorRepository:
      Repository<HumiditySensor>,
  ) { }

  async create(dto: CreateHumiditySensorDto) {
    const record =
      this.humiditySensorRepository.create(dto);
    return await this.humiditySensorRepository.save(record);
  }

  async findAll() {
    return await this.humiditySensorRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }


  async findOne(id: string) {
    return await this.humiditySensorRepository.find({
      where: { id },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async update(id: string, dto: UpdateHumiditySensorDto) {
    return await this.humiditySensorRepository.update(id, dto);
  }

  async remove(id: string) {
    return await this.humiditySensorRepository.delete(id);
  }
}
