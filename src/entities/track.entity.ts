import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";

@Entity({ name: "track" })
export class TrackEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "token_id",
    nullable: false,
    unique: true,
  })
  tokenId!: string;

  @Column({
    name: "creator_id",
    nullable: false,
  })
  creatorId!: string;

  @Column({
    nullable: false,
    default: 0,
    type: "int",
  })
  likes!: number;

  @Column({
    nullable: false,
    default: 0,
    type: "int",
  })
  plays!: number;
}
