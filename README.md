## Step 1:
npm install

## Step 2:
npm run build

## Step 3:
npm start

## Api's
http://localhost:8888/api/user --> create user

http://localhost:8888/api/authentication --> authenticate user with token generation

http://localhost:8888/api/logout --> user logout and refresh the user token

http://localhost:8888/api/articles --> get articles

http://localhost:8888/api/articles/:id --> get particular article

## Notes: ---
1. Used PostgreSql for DataBase.
2. Deployed the DB in Heroku ( cloud ).
3. Used JWT web token for user authentication.