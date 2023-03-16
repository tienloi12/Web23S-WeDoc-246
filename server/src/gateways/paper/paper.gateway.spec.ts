import { Test, TestingModule } from '@nestjs/testing';
import { PaperGateway } from './paper.gateway';

describe('PaperGateway', () => {
  let gateway: PaperGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaperGateway],
    }).compile();

    gateway = module.get<PaperGateway>(PaperGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
