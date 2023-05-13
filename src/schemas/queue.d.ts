export interface IQueue {
    send(queue: string, message: string): Promise<void>;
}
