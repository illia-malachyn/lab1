import { Injectable } from '@nestjs/common';
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto';
import { HumiditySensor } from './entities/humidity-sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HumidityAlertsService } from './humidity-alerts.service';

@Injectable()
export class HumiditySensorsService {
  private readonly CRITICAL_HUMIDITY_LOW = 20;
  private readonly CRITICAL_HUMIDITY_HIGH = 80;

  constructor(
    @InjectRepository(HumiditySensor)
    private readonly humiditySensorRepository:
      Repository<HumiditySensor>,
    private readonly alertsService: HumidityAlertsService,
  ) { }

  async create(dto: CreateHumiditySensorDto) {
    const record =
      this.humiditySensorRepository.create(dto);
    const saved = await this.humiditySensorRepository.save(record);
    
    if (saved.value <= this.CRITICAL_HUMIDITY_LOW || saved.value >= this.CRITICAL_HUMIDITY_HIGH) {
      this.alertsService.emitAlert({
        message: `Critical humidity level! Humidity ${saved.value} ${saved.unit}`,
        humidity: saved.value,
        sensorName: saved.name,
        timestamp: saved.timestamp,
        severity: 'critical',
      });
    }
    
    return saved;
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
    await this.humiditySensorRepository.update(id, dto);
    const updated = await this.humiditySensorRepository.findOne({ where: { id } });
    
    if (updated && (updated.value <= this.CRITICAL_HUMIDITY_LOW || updated.value >= this.CRITICAL_HUMIDITY_HIGH)) {
      this.alertsService.emitAlert({
        message: `Critical humidity level! Humidity ${updated.value} ${updated.unit}`,
        humidity: updated.value,
        sensorName: updated.name,
        timestamp: updated.timestamp,
        severity: 'critical',
      });
    }
    
    return updated;
  }

  async remove(id: string) {
    return await this.humiditySensorRepository.delete(id);
  }
}
