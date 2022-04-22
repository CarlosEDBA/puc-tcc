

const S7Area = Promise.promisifyAll(require('./model/S7Area'))
const S7Beneficio = Promise.promisifyAll(require('./model/S7Beneficio'))
const S7Cargo = Promise.promisifyAll(require('./model/S7Cargo'))
const S7CategoriaProjeto = Promise.promisifyAll(require('../model/StatusProcesso'))
const S7ComentarioProfissional = Promise.promisifyAll(require('./model/S7ComentarioProfissional'))
const S7Conselheiro = Promise.promisifyAll(require('./model/S7Conselheiro'))
const S7Curso = Promise.promisifyAll(require('./model/S7Curso'))
const S7EmpresaAlvo = Promise.promisifyAll(require('./model/S7EmpresaAlvo'))
const S7Empresa = Promise.promisifyAll(require('./model/S7Empresa'))
const S7ExperienciaProfissional = Promise.promisifyAll(require('./model/S7ExperienciaProfissional'))
const S7Ferramenta = Promise.promisifyAll(require('./model/S7Ferramenta'))
const S7Formacao = Promise.promisifyAll(require('./model/S7Formacao'))
const S7Idioma = Promise.promisifyAll(require('./model/S7Idioma'))
const S7Instituicao = Promise.promisifyAll(require('./model/S7Instituicao'))
const S7PrincipalContato = Promise.promisifyAll(require('./model/S7PrincipalContato'))
const S7ProfissionalProjeto = Promise.promisifyAll(require('./model/S7ProfissionalProjeto'))
const S7Profissional = Promise.promisifyAll(require('./model/S7Profissional'))
const S7Projeto = Promise.promisifyAll(require('./model/S7Projeto'))
const S7Segmento = Promise.promisifyAll(require('./model/S7Segmento'))
const S7Setor = Promise.promisifyAll(require('./model/S7Setor'))

const models = {
  S7Area,
  S7Beneficio,
  S7Cargo,
  S7CategoriaProjeto,
  S7ComentarioProfissional,
  S7Conselheiro,
  S7Curso,
  S7EmpresaAlvo,
  S7Empresa,
  S7ExperienciaProfissional,
  S7Ferramenta,
  S7Formacao,
  S7Idioma,
  S7Instituicao,
  S7PrincipalContato,
  S7ProfissionalProjeto,
  S7Profissional,
  S7Projeto,
  S7Segmento,
  S7Setor,
}

async function process(req, res) {}

module.exports = {
  process
}