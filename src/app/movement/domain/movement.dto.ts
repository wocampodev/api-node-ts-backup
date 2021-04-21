import { MovementType } from "../../shared/domain/enums/movement.type";

interface MovementCreateDto {
    user_id    : number;
    type       : MovementType;
    amount     : number;
}

export { MovementCreateDto };