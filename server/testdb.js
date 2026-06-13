import pkg from 'pg'
const { Client } = pkg

const client = new Client({
  connectionString: 'postgresql://postgres:cesi@localhost:5432/tutobox'
})

try {
  await client.connect()
  console.log('Connexion réussie !')
  await client.end()
} catch (err) {
  console.error('Erreur :', err.message)
}