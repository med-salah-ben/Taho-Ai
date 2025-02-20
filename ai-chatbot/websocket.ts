class WebSocketClient {
    private socket!: WebSocket;
    private messageQueue: string[] = [];
    private isConnected: boolean = false;
    private reconnectInterval: number = 5000;

    constructor(private url: string) {
        this.connect();
    }

    private connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            this.isConnected = true;
            console.log("WebSocket connected");
            this.flushQueue();
        };

        this.socket.onmessage = (event) => {
            console.log("Received:", event.data);
        };

        this.socket.onclose = () => {
            this.isConnected = false;
            console.log("WebSocket disconnected, attempting to reconnect...");
            setTimeout(() => this.connect(), this.reconnectInterval);
        };
    }

    sendMessage(message: string) {
        if (this.isConnected) {
            this.socket.send(message);
        } else {
            this.messageQueue.push(message);
        }
    }

    private flushQueue() {
        while (this.messageQueue.length > 0) {
            this.sendMessage(this.messageQueue.shift()!);
        }
    }

    public getWebSocket(): WebSocket {
        return this.socket;
    }
}

export default WebSocketClient;
