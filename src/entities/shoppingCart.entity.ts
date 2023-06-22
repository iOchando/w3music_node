import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "shopping_cart" })
export class ShoppingCartEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    nullable: true,
  })
  wallet!: string;

  @Column({
    name: "token_id",
    nullable: false,
  })
  tokenId!: string;
}
