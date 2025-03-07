const { MongoClient } = require('mongodb');

// Defina a string de conexão do MongoDB

const uri = "mongodb://192.168.100.8:27017"
const client = new MongoClient(uri);
async function main() {
    try {
        // Conecte-se ao servidor MongoDB
        await client.connect();
        console.log("Conexão estabelecida com sucesso com o MongoDB!");
        // Coleção e banco de dados
        const db = client.db("testdb");
        const collection = db.collection("people");
        // Inserir documentos
        const person1 = { nome: "JavaScript", age: 30, city: "New York",  texto: 'texto de javascript do mongoDB' };
        const person2 = { nome: "JavaScript", age: 25, city: "Los Angeles",  texto: 'texto de javascript do mongoDB' };
        const insertResult1 = await collection.insertOne(person1);
        const insertResult2 = await collection.insertOne(person2);
        console.log("Documentos inseridos com sucesso!");
        // Consultar documentos
        const cursor = collection.find();
        const results = await cursor.toArray();
        console.log("Documentos encontrados:");
        results.forEach(result => {
            console.log("Nome:", result.nome);
            console.log("Idade:", result.age);
            console.log("Cidade:", result.city);
            console.log("-------------------------");
        });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}
main();