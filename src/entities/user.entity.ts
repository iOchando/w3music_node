import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    nullable: true,
    unique: true,
  })
  wallet!: string;

  @Column({
    name: "username",
    nullable: false,
    unique: true,
  })
  username!: string;

  @Column({
    nullable: true,
    unique: true,
  })
  email!: string;

  @Column({
    name: "public_url",
    nullable: true,
  })
  publicUrl!: string;

  @Column({
    type: "integer",
    nullable: true,
  })
  age!: number;

  @Column({
    nullable: true,
  })
  location!: string;

  @Column({
    nullable: true,
  })
  avatar!: string;

  @Column({
    nullable: true,
  })
  profession!: string;

  @Column({
    name: "music_genre",
    nullable: true,
  })
  musicGenre!: string;

  @Column({
    nullable: true,
  })
  description!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}
