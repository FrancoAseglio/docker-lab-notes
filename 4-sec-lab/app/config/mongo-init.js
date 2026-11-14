const appDb = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

appDb.createUser({
  user : process.env.MONGO_APP_USERNAME,
  pwd  : process.env.MONGO_APP_PASSWORD,
  roles: [{
    role: 'readWrite',
    db  : process.env.MONGO_INITDB_DATABASE
  }]
});
