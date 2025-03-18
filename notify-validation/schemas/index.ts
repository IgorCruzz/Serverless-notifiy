import { z } from 'zod';

const schema = z.object({
    userId: z.string(),
    message: z.string(),
    priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
});

export const validation = (data: NotifyType) => {
    return schema.safeParse(data);
};

export type NotifyType = z.infer<typeof schema>;
