import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';
import {
  Length,
  IsEmail,
  IsDate,
  IsEmpty,
  Min
} from 'class-validator';

@Entity()
export class User {
    @ObjectIdColumn()
      _id: ObjectId;

    @Column()
    @IsEmpty({ message: 'Name can not be empty.' })
    @Length(3, 64)
      name: string;

    @Column({ unique : true })
    @IsEmpty({ message: 'Email can not be empty.' })
    @IsEmail()
      email: string;

    @Column()
    @IsEmpty({ message: 'Password can not be empty.' })
    @Min(8, { message: 'Password must have at least 8 characters.'})
      password: string;

    @Column()
    @IsDate()
      createdOn: Date;

    @Column()
    @IsDate()
      updatedOn: Date;
}