import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column()
    category!: string;

    @Column()
    location!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column('text')
    imageUrl!: string;

    @Column('decimal', { precision: 10, scale: 8 })
    latitude!: number;

    @Column('decimal', { precision: 11, scale: 8 })
    longitude!: number;

    @Column({
        type: 'enum',
        enum: ['solo', 'duo', 'group']
    })
    participantType!: 'solo' | 'duo' | 'group';

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
