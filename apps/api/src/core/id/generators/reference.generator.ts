import { UlidGenerator } from "./ulid.generator";

export class ReferenceGenerator {
    
    constructor (
        private readonly ulid = new UlidGenerator()
    ){}

    transaction() {
        return `trx_${this.ulid.generate()};` as const
    }

    withdrawal() {
        return `wtdr_${this.ulid.generate()};` as const
    }

    deposit() {
        return `dpsit_${this.ulid.generate()};` as const
    }
    
    card() {
        return `card_${this.ulid.generate()};` as const
    }

    virtualCard() {
        return `vcard_${this.ulid.generate()};` as const
    }

    beneficiary() {
        return `bnfcry_${this.ulid.generate()};` as const
    }

    wallet() {
        return `wlt_${this.ulid.generate()};` as const
    }

    request() {
        return `req_${this.ulid.generate()};` as const
    }
    
    webhook() {
        return `wbhok_${this.ulid.generate()};` as const
    }

    
}