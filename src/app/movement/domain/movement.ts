import { MovementType } from "../../shared/domain/enums/movement.type";

interface Movement {
    id         : number;
    user_id    : number;
    type       : MovementType;
    amount     : number;
    created_at : Date | null;
    updated_at : Date | null;
}

export default Movement;