import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

type NotifyType = {
    userId: string;
    message: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
};

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

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Notificação enviado com sucesso',
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
