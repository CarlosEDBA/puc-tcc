const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const nanoid = require('nanoid')
const mime = require('mime-types')
const update = require('immutability-helper')

const globals = require('../globals')

async function getFileStats(filePath) {
  const stat = await fs.statAsync(filePath).catch(console.error)

  return stat
}

async function readPath(dir) {
  let dirContent = []

  const files = await fs.readdirAsync(dir, {}).catch(console.error)

  for (const file of files) {
    let filepath = path.resolve(dir, file)
    let safeFilePath = filepath.split(globals.DATA_DIR).pop()

    let fileMeta = {
      id: nanoid(),
      name: file,
      isDirectory: false,
      path: safeFilePath
    }

    let fileStats = await getFileStats(filepath)

    if (fileStats) {
      if (fileStats.isDirectory()) {
        fileMeta = { ...fileMeta, isDirectory: true }
      } else {
        fileMeta = {
          ...fileMeta,
          mimeType: mime.lookup(file),
          extension: path.extname(file),
          ino: fileStats.ino,
          size: fileStats.size,
          createdAt: fileStats.atimeMs,
          lastTimeAccessed: fileStats.atimeMs,
          lastTimeModified: fileStats.mtimeMs,
        }
      }

      dirContent.push(fileMeta)
    }
  }

  return dirContent
}

function moveToTemp(filePath) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath)
    const tempFilePath = path.join(globals.PUBLIC_TEMP_DIR, fileName)

    fs.copyFileAsync(filePath, tempFilePath)
      .then(resolve({ filePath: tempFilePath }))
      .catch(reject)
  })
}

async function readDir(req, res) {
  const params = req.body.params
  const safePath = params.path

  if (safePath) {
    const fullPath = path.join(globals.DATA_DIR, safePath)

    readPath(fullPath)
      .then((dirContent) => {
        res.send({
          data: dirContent
        })
      })
      .catch((err) => {
        res.send({
          error: {
            message: 'FileSystemEndpoint error.'
          }
        })
      })
  } else {
    res.send({
      error: {
        message: 'Params missing.'
      }
    })
  }
}

async function retrieveFile(req, res) {
  const params = req.body.params
  const fullFilePath = path.join(globals.DATA_DIR, params.path)
  const fileName = path.basename(fullFilePath)

  getFileStats(fullFilePath)
    .then((stats) => {
      if (stats && !stats.isDirectory()) {
        res.sendFile(fullFilePath, {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename=${fileName}`,
        })
      }
    })
    .catch((err) => {
      res.send({
        error: {
          message: 'FileSystemEndpoint error.'
        }
      })
    })
}

async function deleteFile(req, res) {
  const params = req.body.params
  const fullFilePath = path.join(globals.DATA_DIR, params.path)

  fs.unlinkAsync(fullFilePath)
    .then(() => {
      res.send({
        status: 'success'
      })
    })
    .catch((err) => {
      res.send({
        error: {
          message: 'FileSystemEndpoint error.'
        }
      })
    })
}

async function writeFiles(req, res) {
  res.send({
    status: 'success'
  })
}

async function process(req, res) {
  const action = req.body.action

  switch (action) {
    case 'readDir':
      return readDir(req, res)

    case 'retrieveFile':
      return retrieveFile(req, res)

    case 'deleteFile':
      return deleteFile(req, res)

    case 'writeFiles':
      return writeFiles(req, res)
  }
}

module.exports = {
  process
}