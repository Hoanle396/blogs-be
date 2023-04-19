import { MigrationInterface, QueryRunner } from 'typeorm'
export class AddDataToPermission implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`insert into permisions (id, name) 
    values ( 1 , 'Read User'),
       ( 2 , 'Create User' ),
       ( 3 , 'Update User' ),
       ( 4 , 'Delete User' ),
       ( 5 , 'Read Admin' ),
       ( 6 , 'Create Admin' ),
       ( 7 , 'Update Admin' ),
       ( 8 , 'Delete Admin' ),
       ( 9 , 'Read User' ),
       ( 10 , 'Read User' ),
       ( 11 , 'Read User' ),
       ( 12 , 'Read User' ),
       ( 13 , 'Read User' ),
       ( 14 , 'Read User' ),
    `)
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropColumn('article', 'author')
  }
}
