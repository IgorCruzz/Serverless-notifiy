import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { NotifyType } from './types';
import { NotifyRepository } from './services/sns-services';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body: NotifyType = JSON.parse(event.body || '');

        await NotifyRepository.publishMessage(body);

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
