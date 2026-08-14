import { Injectable } from "@nestjs/common";
import { ReferenceGenerator } from "./generators/reference.generator";

@Injectable()
export class IdService {
    constructor(
        private readonly generator: ReferenceGenerator
    ) { }

    requestId() {
        return this.generator.request();
    }

    transactionId() {
        return this.generator.transaction();
    }

    withdrawalId() {
        return this.generator.withdrawal();
    }

    depositId() {
        return this.generator.deposit();
    }

    cardId() {
        return this.generator.card();
    }

    virtualCardId() {
        return this.generator.virtualCard();
    }

    beneficiaryId() {
        return this.generator.beneficiary();
    }

    walletId() {
        return this.generator.wallet();
    }

    webhookId() {
        return this.generator.webhook();
    }

}