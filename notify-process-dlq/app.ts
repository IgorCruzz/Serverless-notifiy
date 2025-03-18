import { SQSEvent } from 'aws-lambda';

export const handler = async (event: SQSEvent): Promise<void> => {
    for (const record of event.Records) {
        try {
            const body = JSON.parse(record.body);
            console.log(body);
        } catch (error) {
            console.log(error);
        }
    }
};
