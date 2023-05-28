interface IncomingMessage {
    type: string;
}

export const handleMessage = (message: IncomingMessage) => {
    console.log(message);
};
