const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

const Pais = Promise.promisifyAll(require('./model/Pais'))
const Estado = Promise.promisifyAll(require('./model/Estado'))
const Cidade = Promise.promisifyAll(require('./model/Cidade'))
const Meio = Promise.promisifyAll(require('./model/Pacote'))
const Usuario = Promise.promisifyAll(require('./model/Usuario'))
const Servico = Promise.promisifyAll(require('./model/Servico'))
const Pacote = Promise.promisifyAll(require('./model/Pacote'))
const ServicoPacote = Promise.promisifyAll(require('./model/ServicoPacote'))
const TipoDocumento = Promise.promisifyAll(require('./model/TipoDocumento'))
const StatusProcesso = Promise.promisifyAll(require('./model/StatusProcesso'))
const Autoescola = Promise.promisifyAll(require('./model/Autoescola'))
const Empresa = Promise.promisifyAll(require('./model/Empresa'))
const UsuarioEmpresa = Promise.promisifyAll(require('./model/UsuarioEmpresa'))
const PreferenciaUsuario = Promise.promisifyAll(require('./model/PreferenciaUsuario'))

const paises = require('./initialData/paises')
const ufs = require('./initialData/ufs')
const municipios = require('./initialData/municipios')

function gerarHash(str) {
  const saltRounds = 10
  return bcrypt.hashAsync(str, saltRounds)
}

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

async function cadastrarServicos() {
  console.log('log > setup > Cadastrando serviços...')

  const ids = []

  const servicos = [
    { nome: 'Matrícula', tipo: 'Matrícula', valor: 50 },

    { nome: 'Agendamento de foto e biometria', tipo: 'Agendamento', valor: 25 },
    { nome: 'Agendamento de exame médico', tipo: 'Agendamento', valor: 25 },
    { nome: 'Agendamento de exame psicológico', tipo: 'Agendamento', valor: 25 },
    { nome: 'Agendamento de exame teórico', tipo: 'Agendamento', valor: 25 },
    { nome: 'Agendamento de exame prático', tipo: 'Agendamento', valor: 25 },

    { nome: 'Reteste de exame médico', tipo: 'Taxa Detran', valor: 90 },
    { nome: 'Reteste de exame psicológico', tipo: 'Taxa Detran', valor: 150 },
    { nome: 'Reteste de exame teórico', tipo: 'Taxa Detran', valor: 90 },
    { nome: 'Reteste de exame prático A', tipo: 'Taxa Detran', valor: 300 },
    { nome: 'Reteste de exame prático B', tipo: 'Taxa Detran', valor: 270 },

    { nome: 'Remarcação de exame médico', tipo: 'Taxa Detran', valor: 90 },
    { nome: 'Remarcação de exame psicológico', tipo: 'Taxa Detran', valor: 150 },
    { nome: 'Remarcação de exame teórico', tipo: 'Taxa Detran', valor: 90 },
    { nome: 'Remarcação de exame prático A', tipo: 'Exame Prático', valor: 300 },
    { nome: 'Remarcação de exame prático B', tipo: 'Exame Prático', valor: 270 },

    { nome: 'Aula Teórica', tipo: 'Aula', valor: 7 },
    { nome: 'Reposição de Aula Teórica', tipo: 'Aula', valor: 30 },

    { nome: 'Aula Prática de Carro', tipo: 'Aula', valor: 150 },
    { nome: 'Aula Prática de Moto', tipo: 'Aula', valor: 130 },

    { nome: 'Apostila', tipo: 'Material Didático', valor: 50 },

    { nome: 'Taxa de 1ª habilitação', tipo: 'Taxa Detran', valor: 262.19 },
    { nome: 'Informação Teórico A', tipo: 'Taxa Detran', valor: 185.97 },
    { nome: 'Informação Teórico B', tipo: 'Taxa Detran', valor: 185.97 },
    { nome: 'Informação Teórico AB', tipo: 'Taxa Detran', valor: 235.53 },
    { nome: 'Informação Prático', tipo: 'Taxa Detran', valor: 49.31 },
    { nome: 'Alteração de Categoria', tipo: 'Taxa Detran', valor: 135.26 },
  ]

  for (const item of servicos) {
    const servico = new Servico(item)
    ids.push(await servico.save())
  }

  return ids
}

async function cadastrarPacotes() {
  console.log('log > setup > Cadastrando pacotes...')

  const servicos = await cadastrarServicos()

  const pacotes = [
    { nome: 'Primeira Habilitação', categoria: 'A', servicos: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [16, 45], [19, 20], [20, 1], [21, 1], [22, 1], [25, 1]] },
    { nome: 'Primeira Habilitação', categoria: 'B', servicos: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [16, 45], [18, 20], [20, 1], [21, 1], [23, 1], [25, 1]] },
    { nome: 'Primeira Habilitação', categoria: 'AB', servicos: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [16, 45], [18, 20], [19, 20], [20, 1], [21, 1], [24, 1], [25, 1]] },
    { nome: 'Alteração de Categoria', categoria: 'A', servicos: [[0, 1], [1, 1], [2, 1], [5, 1], [26, 1], [19, 15], [25, 1]] },
    { nome: 'Alteração de Categoria', categoria: 'B', servicos: [[0, 1], [1, 1], [2, 1], [5, 1], [26, 1], [18, 20], [25, 1]] },
    { nome: 'Curso de Reciclagem', categoria: null, servicos: [[0, 1], [16, 30]] },
    { nome: 'Curso de Renovação', categoria: null, servicos: [[0, 1], [16, 15], [1, 1], [2, 1]] },
  ]

  for (const pacote of pacotes) {
    const p = new Pacote({ nome: pacote.nome, categoria: pacote.categoria })
    const resultPacote = await p.save()
    const idPacote = resultPacote._id

    for (const arr of pacote.servicos) {
      const servico = arr[0]
      const quantidade = arr[1]
      const idServico = servicos[servico]._id

      const servicoPacote = new ServicoPacote({
        pacote: idPacote,
        servico: idServico,
        quantidade: quantidade,
      })

      await servicoPacote.save()
    }
  }
}

async function cadastrarTiposDocumento() {
  console.log('log > setup > Cadastrando tipos de documento...')

  const tiposDocumento = [
    { nome: 'RG', mascara: 'rg' },
    { nome: 'CNH', mascara: 'cnh' },
    { nome: 'Carteira de Identidade', mascara: null },
    { nome: 'Carteira Profissional', mascara: null },
    { nome: 'Passaporte', mascara: null },
  ]

  for (const tipoDocumento of tiposDocumento) {
    const td = new TipoDocumento(tipoDocumento)
    await td.save()
  }
}

async function cadastrarStatusProcesso() {
  console.log('log > setup > Cadastrando status de processo...')

  const statusProcessoList = [
    { nome: 'Pré-cadastro' },
    { nome: 'Apropriado' },
    { nome: 'Concluído' },
    { nome: 'Cancelado' },
    { nome: 'Indeferido' },
  ]

  for (const statusProcesso of statusProcessoList) {
    const sp = new StatusProcesso(statusProcesso)
    await sp.save()
  }
}

async function cadastrarAutoescolaMagnum() {
  const autoescola = new Autoescola({
    nome: 'Autoescola Magnum',
  })

  const resultAutoescola = await autoescola.save()
  const idAutoescola = resultAutoescola._id

  const fazendinha = new Empresa({
    autoescola: idAutoescola,
    nome: 'Autoescola Magnum Fazendinha',
    cnpj: '00.683.818/0001-56'
  })

  const resultFazendinha = await fazendinha.save()
  const idFazendinha = resultFazendinha._id

  const portao = new Empresa({
    autoescola: idAutoescola,
    nome: 'Autoescola Magnum Portão',
    cnpj: '26.943.647/0001-40'
  })

  const resultPortao = await portao.save()
  const idPortao = resultPortao._id

  const santaQuiteria = new Empresa({
    autoescola: idAutoescola,
    nome: 'Autoescola Magnum Premium',
    cnpj: '22.580.027/0001-33'
  })

  const resultSantaQuiteria = await santaQuiteria.save()
  const idSantaQuiteria = resultSantaQuiteria._id

  const carlos = new Usuario({
    nome: 'Carlos Eduardo',
    sobrenome: 'Barbosa de Almeida',
    email: 'carlosedba@outlook.com',
    senha: await gerarHash('carlos').catch(console.error),
  })

  const resultCarlos = await carlos.save()
  const idCarlos = resultCarlos._id

  const carlosFazendinha = new UsuarioEmpresa({
    usuario: idCarlos,
    empresa: idFazendinha,
    funcao: 'Administrador'
  })

  await carlosFazendinha.save()

  const carlosPortao = new UsuarioEmpresa({
    usuario: idCarlos,
    empresa: idPortao,
    funcao: 'Administrador'
  })

  await carlosPortao.save()

  const carlosSantaQuiteria = new UsuarioEmpresa({
    usuario: idCarlos,
    empresa: idSantaQuiteria,
    funcao: 'Administrador'
  })

  await carlosSantaQuiteria.save()

  const autoescolaPadrao = new PreferenciaUsuario({
    usuario: idCarlos,
    nome: 'autoescolaPadrao',
    valor: idFazendinha
  })

  await autoescolaPadrao.save()

  const autoescolas = new PreferenciaUsuario({
    usuario: idCarlos,
    nome: 'autoescolas',
    valor: {
      [idFazendinha]: {
        cor: 'violetBlue'
      },
      [idPortao]: {
        cor: 'portlandOrange'
      },
      [idSantaQuiteria]: {
        cor: 'oceanGreen'
      },
    }
  })

  await autoescolas.save()
}


module.exports = async () => {
  /*
  * Países
  */
  let paises = await countCollectionDocuments(Pais).catch(console.error)
  if (paises === 0) await cadastrarPaises()

  paises = await countCollectionDocuments(Pais).catch(console.error)
  console.log('Países: ', paises)


  /*
  * Estados
  */
  let estados = await countCollectionDocuments(Estado).catch(console.error)
  if (estados === 0) await cadastrarEstados()

  estados = await countCollectionDocuments(Estado).catch(console.error)
  console.log('Estados: ', estados)


  /*
  * Cidades
  */
  let cidades = await countCollectionDocuments(Cidade).catch(console.error)
  if (cidades === 0) await cadastrarCidades()

  cidades = await countCollectionDocuments(Cidade).catch(console.error)
  console.log('Cidades: ', cidades)

  if (cidades > 0) {
    let capitaisReferenciadas = await capitaisRefenciadas().catch(console.error)
    if (capitaisReferenciadas === 0) await adicionarReferenciaCapitais()
  }


  /*
  * Pacotes e Serviços
  */
  let pacotes = await countCollectionDocuments(Pacote).catch(console.error)
  let servicos = await countCollectionDocuments(Servico).catch(console.error)
  let servicosPacotes = await countCollectionDocuments(ServicoPacote).catch(console.error)

  if (pacotes === 0 && servicos === 0 && servicosPacotes === 0) await cadastrarPacotes()

  pacotes = await countCollectionDocuments(Pacote).catch(console.error)
  servicos = await countCollectionDocuments(Servico).catch(console.error)
  servicosPacotes = await countCollectionDocuments(ServicoPacote).catch(console.error)

  console.log('Pacotes: ', pacotes)
  console.log('Serviços: ', servicos)
  console.log('ServiçosPacotes: ', servicosPacotes)


  /*
  * Tipos de Documento
  */
  let tiposDocumento = await countCollectionDocuments(TipoDocumento).catch(console.error)
  if (tiposDocumento === 0) await cadastrarTiposDocumento()

  tiposDocumento = await countCollectionDocuments(TipoDocumento).catch(console.error)
  console.log('Tipos de documentos: ', tiposDocumento)


  /*
  * Status de Processos
  */
  let statusProcesso = await countCollectionDocuments(StatusProcesso).catch(console.error)
  if (statusProcesso === 0) await cadastrarStatusProcesso()

  statusProcesso = await countCollectionDocuments(StatusProcesso).catch(console.error)
  console.log('Status de processos: ', statusProcesso)


  /*
  * Autoescola Magnum
  */
  let autoescolas = await countCollectionDocuments(Autoescola).catch(console.error)
  let empresas = await countCollectionDocuments(Empresa).catch(console.error)
  let usuarios = await countCollectionDocuments(Usuario).catch(console.error)
  let usuariosEmpresas = await countCollectionDocuments(UsuarioEmpresa).catch(console.error)
  let preferenciasUsuarios = await countCollectionDocuments(PreferenciaUsuario).catch(console.error)

  if (
      autoescolas === 0 &&
      empresas === 0 &&
      usuarios === 0 &&
      usuariosEmpresas === 0 &&
      preferenciasUsuarios === 0
  ) {
    await cadastrarAutoescolaMagnum()
  }

  autoescolas = await countCollectionDocuments(Autoescola).catch(console.error)
  empresas = await countCollectionDocuments(Empresa).catch(console.error)
  usuarios = await countCollectionDocuments(Usuario).catch(console.error)
  usuariosEmpresas = await countCollectionDocuments(UsuarioEmpresa).catch(console.error)
  preferenciasUsuarios = await countCollectionDocuments(PreferenciaUsuario).catch(console.error)

  console.log('Autoescolas: ', autoescolas)
  console.log('Empresas: ', empresas)
  console.log('Usuários: ', usuarios)
  console.log('UsuáriosEmpresas: ', usuariosEmpresas)
  console.log('PreferenciasUsuarios: ', preferenciasUsuarios)
}