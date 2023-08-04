import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "likes_track" })
export class LikeTrackEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  user!: UserEntity;

  @Column({
    name: "token_id",
    nullable: false,
  })
  tokenId!: string;
}
