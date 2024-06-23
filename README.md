# API-Grocery

Hallo ini Project API saya dalam membuat API grocery. kalian bisa mencobanya  ikuti cara dibawah ini: 



To install dependencies:

```bash
bun install
```

create .env file with data :

- note : install postgresql in your computer

```env
API_PORT=3000

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
 ```

Run prisma: 
```bash 
bun prisma db push
```


To run:

```bash
bun run start
```

This project was created using `bun init` in bun v1.1.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
