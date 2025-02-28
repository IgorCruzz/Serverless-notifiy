import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PublishCommand, SNSClient, PublishCommandInput } from '@aws-sdk/client-sns';

type NotifyType = {
    userId: string;
    message: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
};

export const snsClient = new SNSClient({});

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body: NotifyType = JSON.parse(event.body || '');

        if (!body.userId || !body.message || !body.priority) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Parâmetros inválidos',
                }),
            };
        }

        const publishCommandInput: PublishCommandInput = {
            TopicArn: process.env.SNS_TOPIC_ARN,
            Message: JSON.stringify({
                userId: body.userId,
                message: body.message,
                priority: body.priority,
            }),
        };

        const publishCommand = new PublishCommand(publishCommandInput);

        await snsClient.send(publishCommand);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Notificação enviada com sucesso',
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Ocorreu um problema interno',
            }),
        };
    }
};
