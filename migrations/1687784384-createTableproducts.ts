import { Sql } from 'postgres';

export type Productsmigration = {
  id: number;
  name: string;
  type: string;
  object: string;
  price: number;
};
export async function up(sql: Sql) {
  await sql`
  CREATE TABLE products(
    id integer  PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(30) ,
    type varchar (30) ,
    object varchar(200),
     price integer
  );
  `;
}
export async function down(sql: Sql) {
  await sql`
  DROP TABLE products
  `;
}
