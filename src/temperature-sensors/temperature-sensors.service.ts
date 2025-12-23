import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto';
import { TemperatureSensor } from './entities/temperature-sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureAlertsService } from './temperature-alerts.service';

@Injectable()
export class TemperatureSensorsService {
  private readonly CRITICAL_TEMP = -10;

  constructor(
    @InjectRepository(TemperatureSensor)
    private readonly temperatureSensorRepository:
      Repository<TemperatureSensor>,
    private readonly alertsService: TemperatureAlertsService,
  ) { }

  async create(createSensorDto: CreateTemperatureSensorDto) {
    const record =
      this.temperatureSensorRepository.create(createSensorDto);
    const saved = await this.temperatureSensorRepository.save(record);
    
    if (saved.value <= this.CRITICAL_TEMP) {
      this.alertsService.emitAlert({
        message: `Critical temperature! Value ${saved.value} ${saved.unit}`,
        temperature: saved.value,
        sensorName: saved.name,
        timestamp: saved.timestamp,
        severity: 'critical',
      });
    }
    
    return saved;
  }

  async findAll() {
    return await this.temperatureSensorRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async findOne(id: string) {
    return await this.temperatureSensorRepository.find({
      where: { id },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async update(id: string, updateSensorDto: UpdateTemperatureSensorDto) {
    return await this.temperatureSensorRepository.update(id, updateSensorDto);
  }

  async remove(id: string) {
    return await this.temperatureSensorRepository.delete(id);
  }
}
