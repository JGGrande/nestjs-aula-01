import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1704854076132 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "user",
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          unsigned: true,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255'
        },
        {
          name: 'email',
          type: 'varchar',
          length: '255',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'role',
          type: 'enum',
          enum: ['User', 'Admin'],
          default: "'User'",
        },
        {
          name: 'createdAt',
          type: 'datetime(6)',
          default: 'CURRENT_TIMESTAMP(6)'
        },
        {
          name: 'updatedAt',
          type: 'datetime(6)',
          default: 'CURRENT_TIMESTAMP(6)'
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }

}
