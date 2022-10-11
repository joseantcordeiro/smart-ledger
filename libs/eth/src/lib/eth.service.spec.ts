import { Test } from '@nestjs/testing';
import { EthService } from './eth.service';

describe('EthService', () => {
  let service: EthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EthService],
    }).compile();

    service = module.get(EthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
