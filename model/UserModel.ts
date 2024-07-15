import { Entity, PrimaryKey } from "~/Decorator";

@Entity()
export class User {
    @PrimaryKey()
    id: string
}
