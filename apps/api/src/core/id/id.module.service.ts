import { Module } from "@nestjs/common";
import { IdService } from "./id.service";
import { ReferenceGenerator } from "./generators/reference.generator";
import { UlidGenerator } from "./generators/ulid.generator";

@Module({
    providers: [IdService, ReferenceGenerator, UlidGenerator],
    exports: [IdService]
})

export class IdModule { }