import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';

@WebSocketGateway({ path: '/paper' })
export class PaperGateway implements OnGatewayConnection, OnGatewayDisconnect {
   
  @WebSocketServer()
  server: Server;

  handleConnection(client: WebSocket, request: Request, ...args: any) {
    const docName = request.url.slice(1).split('?')[1].split('=')[1];
    console.log(`client connected: ${docName}`);
    setupWSConnection(client, request, {
      ...(docName && { docName }) 
    });
  }

  handleDisconnect(client: any) {
    console.log(`client disconnected`);
  }
}
