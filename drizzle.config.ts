import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.ts',
  dialect: 'turso',
  dbCredentials: {
    url:  "libsql://mtms-db-jpnoolmt.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjk0NzM3MzksImlkIjoiZDVmZmYzYzgtYjMzOS00ZjIzLTgwOWEtNmUyMTM0MzYwYjg4In0.F_B3nx6b8smp_3x-bIMAjzigoNtG66m4GSQVeNHKbPDhokEiBuViMvu93qPSGeyV7dz_OeAZxYON0TsuwuzcAg",
  },
});