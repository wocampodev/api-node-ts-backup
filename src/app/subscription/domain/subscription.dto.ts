interface SubscriptionCreateDto {
    code: string;
    userId: number;
    amount: number;
    cron: string;
}

interface SubscriptionUpdateDto {
    code: string;
    amount: number;
    cron: string;
}

export { SubscriptionCreateDto, SubscriptionUpdateDto };
