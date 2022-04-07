const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

const Pais = Promise.promisifyAll(require('./model/Pais'))
const Estado = Promise.promisifyAll(require('./model/Estado'))
const Cidade = Promise.promisifyAll(require('./model/Cidade'))
const Usuario = Promise.promisifyAll(require('./model/Usuario'))

const paises = require('./initialData/paises')
const ufs = require('./initialData/ufs')
const municipios = require('./initialData/municipios')

function countCollectionDocuments(collection) {
  return new Promise((resolve, reject) => {
    collection.countDocuments({}, (err, count) => {
      if (err) reject(err)
      resolve(count)
    })
  })
}

function capitaisRefenciadas() {
  return new Promise((resolve, reject) => {
    Estado.countDocuments({capital: {$exists: true}}, (err, count) => {
      if (err) reject(err)
      resolve(count)
    })
  })
}

async function cadastrarPaises() {
  console.log('log > setup > Cadastrando países...')

  for (let i = 0; i < paises.length; i++) {
    const currentItem = paises[i]

    const pais = new Pais({
      nome: currentItem[0],
      gentilico: currentItem[1],
    })

    await pais.save()
  }
}

async function cadastrarEstados() {
  console.log('log > setup > Cadastrando estados...')

  const pais = await Pais.findOneAsync({nome: 'Brasil'}).catch(console.error)

  console.log('pais', pais)

  for (let i = 0; i < ufs.length; i++) {
    const currentItem = ufs[i]

    const estado = new Estado({
      pais: pais._id,
      nome: currentItem.nome,
      sigla: currentItem.sigla,
      slug: currentItem.slug,
    })

    await estado.save()
  }
}

async function cadastrarCidades() {
  console.log('log > setup > Cadastrando cidades...')

  const pais = await Pais.findOneAsync({nome: 'Brasil'}).catch(console.error)

  for (let i = 0; i < municipios.length; i++) {
    const currentItem = municipios[i]

    for (let j = 0; j < ufs.length; j++) {
      const uf = ufs[j]

      if (currentItem.codigoUf === uf.codigo) {
        const estado = await Estado.findOneAsync({slug: uf.slug}).catch(console.error)

        const cidade = new Cidade({
          pais: pais._id,
          estado: estado._id,
          nome: currentItem.nome,
          slug: currentItem.slug,
        })

        await cidade.save()
      }
    }
  }
}

async function adicionarReferenciaCapitais() {
  console.log('log > setup > Adicionando referências de capitais...')

  for (const uf of ufs) {
    for (const municipio of municipios) {
      if (municipio.codigo === uf.codigoCapital) {
        const cidade = await Cidade.findOneAsync({slug: municipio.slug}).catch(console.error)

        Estado.findOneAndUpdateAsync(
          {slug: uf.slug},
          {capital: cidade._id}
        ).catch(console.error)
      }
    }
  }
}

async function createAdmin() {
  const plainTextPassword = 'AquelaSenhaMarota'
  const saltRounds = 10
  const hash = await bcrypt.hashAsync(plainTextPassword, saltRounds).catch(console.error)

  let user = new Usuario({
    nome: 'Carlos Eduardo',
    sobrenome: 'Barbosa de Almeida',
    email: 'carlosedba@outlook.com',
    senha: hash,
    funcao: 'Administrador'
  })

  await user.save()
}

module.exports = async () => {
  await countCollectionDocuments(Pais).then(async (count) => {
    if (count === 0) await cadastrarPaises()

    countCollectionDocuments(Pais).then(async (count) => {
      console.log('Países: ', count)
    }).catch(console.error)
  }).catch(console.error)

  await countCollectionDocuments(Estado).then(async (count) => {
    if (count === 0) await cadastrarEstados()

    countCollectionDocuments(Estado).then(async (count) => {
      console.log('Estados: ', count)
    }).catch(console.error)
  }).catch(console.error)

  await countCollectionDocuments(Cidade).then(async (count) => {
    if (count === 0) await cadastrarCidades()

    countCollectionDocuments(Cidade).then(async (count) => {
      console.log('Cidades: ', count)
    }).catch(console.error)
  }).catch(console.error)

  await countCollectionDocuments(Cidade).then((count) => {
    if (count > 0) {
      capitaisRefenciadas().then(async (count) => {
        if (count === 0) await adicionarReferenciaCapitais()
      }).catch(console.error)
    }
  }).catch(console.error)

  await countCollectionDocuments(Usuario).then(async (count) => {
    if (count === 0) {
      await createAdmin()
    }

    countCollectionDocuments(Usuario).then(async (count) => {
      console.log('Usuarios: ', count)
    }).catch(console.error)
  }).catch(console.error)
}