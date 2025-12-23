import { Injectable } from '@nestjs/common';
import { CreateLightSensorDto } from './dto/create-light-sensor.dto';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto';
import { LightSensor } from './entities/light-sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightAlertsService } from './light-alerts.service';

@Injectable()
export class LightSensorsService {
  private readonly CRITICAL_LUMINOSITY = 0;

  constructor(
    @InjectRepository(LightSensor)
    private readonly lightSensorRepository:
      Repository<LightSensor>,
    private readonly alertsService: LightAlertsService,
  ) { }


  async create(dto: CreateLightSensorDto) {
    const record =
      this.lightSensorRepository.create(dto);
    const saved = await this.lightSensorRepository.save(record);
    
    if (saved.value <= this.CRITICAL_LUMINOSITY) {
      this.alertsService.emitAlert({
        message: `Critical light level! Luminosity ${saved.value} lux`,
        luminosity: saved.value,
        sensorName: saved.name,
        timestamp: saved.timestamp,
        severity: 'critical',
      });
    }
    
    return saved;
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
    await this.lightSensorRepository.update(id, dto);
    const updated = await this.lightSensorRepository.findOne({ where: { id } });
    
    if (updated && updated.value <= this.CRITICAL_LUMINOSITY) {
      this.alertsService.emitAlert({
        message: `Critical light level! Luminosity ${updated.value} lux`,
        luminosity: updated.value,
        sensorName: updated.name,
        timestamp: updated.timestamp,
        severity: 'critical',
      });
    }
    
    return updated;
  }

  async remove(id: string) {
    return await this.lightSensorRepository.delete(id);
  }
}
