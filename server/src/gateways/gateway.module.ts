import { Module } from '@nestjs/common';
import { PaperGateway } from './paper/paper.gateway';

@Module({
    providers: [PaperGateway],
})
export class GatewayModule {}